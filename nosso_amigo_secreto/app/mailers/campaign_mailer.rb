class CampaignMailer < ApplicationMailer

  def raffle(campaign, member, friend)
    @campaign = campaign
    @member = member
    @friend = friend
    mail to: @member.email, subject: "Nosso Amigo Secreto: #{@campaign.title}"
  end
  
  def have_error(campaign)
    @campaign = campaign
    @token = @campaign.members.first.token

    mail to: @campaign.user.email, subject: "[ERRO] Nosso Amigo Secreto: #{@campaign.title}"
  end
end