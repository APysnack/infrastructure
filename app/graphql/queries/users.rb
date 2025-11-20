module Queries
  class Users < GraphQL::Schema::Resolver
    type [Types::Models::UserType], null: false
    description "Get all users"

    def resolve
      ::User.all
    end
  end
end
