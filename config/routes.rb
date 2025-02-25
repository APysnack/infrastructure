Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    sign_up: 'signup',
    password: 'forgot',
    confirmation: 'activate',
    invitation: 'invite'
  }

  get "up" => "rails/health#show", as: :rails_health_check
end
