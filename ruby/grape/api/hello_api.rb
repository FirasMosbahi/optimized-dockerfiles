require 'grape'

class HelloAPI < Grape::API
  format :json

  namespace :api do
    desc 'Returns a greeting message'
    get :hello do
      {
        message: 'Hello from Grape!',
        framework: 'Grape',
        status: 'success',
        timestamp: Time.now.to_i
      }
    end

    desc 'Health check endpoint'
    get :health do
      { status: 'healthy' }
    end
  end

  get :health do
    { status: 'ok' }
  end

  add_swagger_documentation
end
