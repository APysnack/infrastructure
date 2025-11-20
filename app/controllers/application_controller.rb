class ApplicationController < ActionController::API
  include Devise::Controllers::Helpers
  include ActionController::Cookies

  before_action :jwt_from_cookies

  private

  def jwt_from_cookies
    # Extract JWT from encrypted cookie and add to Authorization header for devise-jwt
    if cookies.encrypted[:_auth_token].present?
      request.headers['Authorization'] = "Bearer #{cookies.encrypted[:_auth_token]}"
    end
  end
end
