module Types
  class MutationType < BaseObject
    field :sign_in, Types::SignInPayloadType, null: true, description: "Sign in a user with email and password" do
      argument :email, String, required: true, description: "User email"
      argument :password, String, required: true, description: "User password"
    end
    
    field :sign_up, Types::SignUpPayloadType, null: true, description: "Sign up a new user" do
      argument :email, String, required: true, description: "User email"
      argument :password, String, required: true, description: "User password"
      argument :password_confirmation, String, required: true, description: "Password confirmation"
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

    def sign_up(email:, password:, password_confirmation:)
      # Check if user already exists
      if User.exists?(email: email)
        return {
          success: false,
          message: 'Email already exists',
          user: nil,
          token: nil
        }
      end

      # Create new user
      user = User.new(email: email, password: password, password_confirmation: password_confirmation)
      
      if user.save
        token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
        
        # Store token in context to be set as cookie in controller
        context[:auth_token] = token
        context[:auth_user] = user
        
        {
          success: true,
          message: 'Account created successfully',
          user: user,
          token: token
        }
      else
        {
          success: false,
          message: user.errors.full_messages.join(', '),
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
