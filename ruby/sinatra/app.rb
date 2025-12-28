require 'sinatra'
require 'json'

# Configure Sinatra
set :bind, '0.0.0.0'
set :port, 4567
set :environment, :production

# API Routes
get '/api/hello' do
  content_type :json
  {
    message: 'Hello from Sinatra!',
    framework: 'Sinatra',
    status: 'success',
    timestamp: Time.now.to_i
  }.to_json
end

get '/api/health' do
  content_type :json
  { status: 'healthy' }.to_json
end

# Health check endpoint
get '/health' do
  content_type :json
  { status: 'ok' }.to_json
end

# Root endpoint
get '/' do
  content_type :json
  {
    name: 'Sinatra Demo API',
    version: '1.0.0',
    endpoints: ['/api/hello', '/api/health', '/health']
  }.to_json
end
