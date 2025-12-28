require_relative 'boot'

require 'rails'
require 'action_controller/railtie'
require 'action_view/railtie'

module RailsDemo
  class Application < Rails::Application
    config.load_defaults 7.1
    config.api_only = true
    config.eager_load = true

    # Set the host authorization to allow all hosts
    config.hosts.clear
  end
end
