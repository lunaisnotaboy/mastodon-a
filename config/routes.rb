# frozen_string_literal: true

require 'sidekiq_unique_jobs/web'
require 'sidekiq-scheduler/web'

Yotsuba::Application.routes.draw do
  # Paths of routes on the web app that to not require to be indexed or
  # have alternative format representations requiring separate controllers
  web_app_paths = %w[
    /getting-started
    /keyboard-shortcuts
    /home
    /public
    /public/local
    /conversations
    /lists/(*any)
    /notifications
    /favourites
    /bookmarks
    /pinned
    /start
    /directory
    /explore/(*any)
    /search
    /publish
    /follow_requests
    /blocks
    /domain_blocks
    /mutes
    /statuses/(*any)
  ].freeze

  root 'home#index'

  mount LetterOpenerWeb::Engine, at: 'letter_opener' if Rails.env.development?

  get 'health', to: 'health#show'

  authenticate, lambda { |u| u.role&.can?(:view_devops) } do
    mount PgHero::Engine, at: 'pghero', as: :pghero
    mount Sidekiq::Web, at: 'sidekiq', as: :sidekiq
  end

  use_doorkeeper do
    controllers authorizations: 'oauth/authorizations',
                authorized_applications: 'oauth/authorized_applications',
                tokens: 'oauth/tokens'
  end

  get '.well-known/host-meta', to: 'well_known/host_meta#show', as: :host_meta, defaults: { format: 'xml' }
  get '.well-known/nodeinfo', to: 'well_known/nodeinfo#index', as: :nodeinfo, defaults: { format: 'json' }
  get '.well-known/webfinger', to: 'well_known/webfinger#show', as: :webfinger
  get '.well-known/change-password', to: redirect('/auth/edit')

  get '/nodeinfo/2.0', to: 'well_known/nodeinfo#show', as: :nodeinfo_schema

  get 'manifest', to: 'manifests#show', defaults: { format: 'json' }
  get 'intent', to: 'intents#show'
  get 'custom.css', to: 'custom_css#show', as: :custom_css

  resource :instance_actor, path: 'actor', only: [:show] do
    resource :inbox, only: [:create], module: :activitypub
    resource :outbox, only: [:show], module: :activitypub
  end

  devise_scope :user do
    get '/invite/:invite_code', to: 'auth/registrations#new', as: :public_invite

    namespace :auth do
      resource :setup, only: [:show, :update], controller: :setup
      resource :challenge, only: [:create], controller: :challenges
      get 'sessions/security_key_options', to: 'sessions#webauthn_options'
      post 'captcha_confirmation', to: 'confirmations#confirm_captcha', as: :captcha_confirmation
    end
  end

  devise_for :users, path: 'auth', format: false, controllers: {
    omniauth_callbacks: 'auth/omniauth_callbacks',
    sessions: 'auth/sessions',
    registrations: 'auth/registrations',
    passwords: 'auth/passwords',
    confirmations: 'auth/confirmations'
  }

  get '/users/:username', to: redirect('/@%{username}'), constraints: lambda { |req| req.format.nil? || req.format.html? }
  get '/users/:username/statuses/:id', to: redirect('/@%{username}/%{id}'), constraints: lambda { |req| req.format.nil? || req.format.html? }
  get '/authorize_follow', to: redirect { |_, request| "/authorize_interaction?#{request.params.to_query}" }

  resources :accounts, path: 'users', only: [:show], param: :username do
    resources :statuses, only: [:show] do
      member do
        get :activity
        get :embed
      end

      resources :replies, only: [:index], module: :activitypub
    end
  end
end
