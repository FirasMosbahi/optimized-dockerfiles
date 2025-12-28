Rails.application.routes.draw do
  namespace :api do
    get 'hello', to: 'hello#index'
    get 'health', to: 'hello#health'
  end

  get 'up', to: 'rails/health#show', as: :rails_health_check
end
