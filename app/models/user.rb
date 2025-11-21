class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  rolify
  
  devise :database_authenticatable, :registerable,
         :validatable, :jwt_authenticatable, jwt_revocation_strategy: self


  after_create :assign_default_role

  private

  def assign_default_role
    self.add_role(:member) if self.roles.blank?
  end
end
