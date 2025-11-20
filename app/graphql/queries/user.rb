module Queries
  class User < GraphQL::Schema::Resolver
    type Types::Models::UserType, null: false
    description "Get a user by ID"
    argument :id, ID, required: true

    def resolve(id:)
      ::User.find(id)
    end
  end
end
