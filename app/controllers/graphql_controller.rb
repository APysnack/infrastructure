class GraphqlController < ApplicationController
  def execute
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]

    context = {
      current_user: current_user
    }

    result = InfrastructureSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue StandardError => e
    handle_error_in_development(e)
  end

  private

  def handle_error_in_development(error)
    if Rails.env.development?
      render json: { errors: [{ message: error.message, backtrace: error.backtrace }] }, status: 500
    else
      render json: { errors: [{ message: "Internal server error" }] }, status: 500
    end
  end

  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      JSON.parse(ambiguous_param) rescue {}
    when Hash
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
