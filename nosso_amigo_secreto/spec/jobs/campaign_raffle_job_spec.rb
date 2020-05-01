require 'rails_helper'

RSpec.describe CampaignRaffleJob, type: :job do
  include ActiveJob::TestHelper

  let(:campaign) { FactoryBot.create(:campaign) }
  subject(:job) { CampaignRaffleJob.perform_later(campaign) }

  it 'queues the job' do
    expect { job }.to change(ActiveJob::Base.queue_adapter.enqueued_jobs, :size).by(1)
  end

  it 'is in emails queue' do
    expect(CampaignRaffleJob.new.queue_name).to eq('emails')
  end

  it 'executes perform' do
    campaign.members += FactoryBot.create_list(:member, 3, campaign: campaign)
    campaign.save

    expect(RaffleService.new(campaign).call.class).to eq(Hash)
    perform_enqueued_jobs { job }
  end

  it 'handles no results error' do
    expect(RaffleService.new(campaign).call).to eq(false)
    perform_enqueued_jobs { job }
  end

  after do
    clear_enqueued_jobs
    clear_performed_jobs
  end
end
