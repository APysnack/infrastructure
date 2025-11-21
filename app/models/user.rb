class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  rolify
  
  devise :database_authenticatable, :registerable,
         :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  store :settings, accessors: [:theme], coder: JSON

  after_create :assign_default_role

  validate :validate_settings, if: -> { settings.present? }

  private

  def assign_default_role
    self.add_role(:member) if self.roles.blank?
  end

  def validate_settings
    return if settings.is_a?(Hash)
    errors.add(:settings, "must be a valid JSON object")
  end
end
