module Types
  class QueryType < BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :user, resolver: Queries::User
    field :users, resolver: Queries::Users
  end
end
