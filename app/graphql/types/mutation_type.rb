module Types
  class MutationType < BaseObject
    field :sign_in, Types::SignInPayloadType, null: true, description: "Sign in a user with email and password" do
      argument :email, String, required: true, description: "User email"
      argument :password, String, required: true, description: "User password"
    end
    
    field :sign_out, Types::SignOutPayloadType, null: true, description: "Sign out the current user"

    def sign_in(email:, password:)
      user = User.find_by(email: email)
      
      if user&.valid_password?(password)
        token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
        
        # Store token in context to be set as cookie in controller
        context[:auth_token] = token
        context[:auth_user] = user
        
        {
          success: true,
          message: 'Signed in successfully',
          user: user,
          token: token
        }
      else
        {
          success: false,
          message: 'Invalid email or password',
          user: nil,
          token: nil
        }
      end
    end

    def sign_out
      context[:should_clear_auth] = true
      
      if context[:current_user]
        {
          success: true,
          message: 'Signed out successfully'
        }
      else
        {
          success: false,
          message: 'No active session'
        }
      end
    end
  end
end
