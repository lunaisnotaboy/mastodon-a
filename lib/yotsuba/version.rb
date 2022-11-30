# frozen_string_literal: true

module Yotsuba
  module Version
    module_function

    def major
      0
    end

    def minor
      1
    end

    def patch
      0
    end

    def flags
      ''
    end

    def suffix
      ''
    end

    def to_a
      [major, minor, patch].compact
    end

    def to_s
      [to_a.join('.'), flags, suffix].join
    end

    def repository
      ENV.fetch('YOTSUBA_REPOSITORY', 'lunaisnotaboy/yotsuba')
    end

    def source_base_url
      ENV.fetch('SOURCE_BASE_URL', "https://github.com/#{repository}")
    end

    def source_tag
      ENV.fetch('SOURCE_TAG', nil)
    end

    def source_url
      if source_tag
        "#{source_base_url}/tree/#{source_tag}"
      else
        source_base_url
      end
    end

    def user_agent
      @user_agent ||= "#{HTTP::Request::USER_AGENT} (Yotsuba/#{Version}; +http#{Rails.configuration.x.use_https ? 's' : ''}://#{Rails.configuration.x.web_domain})"
    end
  end
end