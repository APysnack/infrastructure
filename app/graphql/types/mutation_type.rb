module Types
  class MutationType < BaseObject
    field :dummy, String, null: true, description: "Placeholder mutation"

    def dummy
      "This is a placeholder mutation"
    end
  end
end
