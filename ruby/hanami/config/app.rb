require 'hanami/router'
require 'json'

module HanamiApp
  def self.app
    Hanami::Router.new do
      get '/api/hello' do |env|
        [
          200,
          { 'Content-Type' => 'application/json' },
          [{
            message: 'Hello from Hanami!',
            framework: 'Hanami',
            status: 'success',
            timestamp: Time.now.to_i
          }.to_json]
        ]
      end

      get '/api/health' do |env|
        [
          200,
          { 'Content-Type' => 'application/json' },
          [{ status: 'healthy' }.to_json]
        ]
      end

      get '/health' do |env|
        [
          200,
          { 'Content-Type' => 'application/json' },
          [{ status: 'ok' }.to_json]
        ]
      end
    end
  end
end
