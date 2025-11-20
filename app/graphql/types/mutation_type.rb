module Types
  class MutationType < BaseObject
    field :sign_in, resolver: Mutations::SignIn
    field :sign_up, resolver: Mutations::SignUp
    field :sign_out, resolver: Mutations::SignOut
  end
end
