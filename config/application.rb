require_relative 'boot'

require 'rails'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'sprockets/railtie'

# Used to be implicitly required in `action_mailbox/engine`
require 'mail'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

Dotenv::Railtie.load

Bundler.require(:pam_authentication) if ENV['PAM_ENABLED'] == 'true'

module Yotsuba
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1
    config.add_autoload_paths_to_load_path = false

    config.action_mailer.deliver_later_queue_name = 'mailers'
    config.active_job.queue_adapter = :sidekiq

    config.middleware.use Rack::Attack
    config.middleware.use Yotsuba::RackMiddleware

    config.to_prepare do
      Doorkeeper::AuthorizationsController.layout 'modal'
      Doorkeeper::AuthorizedApplicationsController.layout 'admin'
      Doorkeeper::Application.send :include, ApplicationExtension
      Doorkeeper::Application.send :include, AccessTokenExtension
      Devise::FailureApp.send :include, AbstractController::Callbacks
      Devise::FailureApp.send :include, Localized
    end
  end
end
