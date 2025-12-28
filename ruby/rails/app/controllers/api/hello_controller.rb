module Api
  class HelloController < ApplicationController
    def index
      render json: {
        message: 'Hello from Ruby on Rails!',
        framework: 'Ruby on Rails',
        status: 'success',
        timestamp: Time.now.to_i
      }
    end

    def health
      render json: { status: 'healthy' }
    end
  end
end
