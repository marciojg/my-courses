class PagesController < ApplicationController
  def home
    current_user&.campaigns&.present? ? redirect_to(campaigns_path) : render(:home)
  end
end
