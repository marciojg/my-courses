require 'rails_helper'

RSpec.describe MembersController, type: :controller do
  include Devise::Test::ControllerHelpers

  before(:each) do
    request.env["HTTP_ACCEPT"] = 'application/json'

    @request.env["devise.mapping"] = Devise.mappings[:user]
    @current_user = FactoryBot.create(:user)
    sign_in @current_user
  end

  describe "POST #create" do
    before(:each) do
      @member_attributes = FactoryBot.attributes_for(:member).merge!(campaign_id: FactoryBot.create(:campaign).id)
    end

    it "returns http success" do
      post :create, params: {member: @member_attributes}
      expect(response).to have_http_status(:success)
    end

    it "returns json success" do
      post :create, params: {member: @member_attributes}
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["name"]).to eq(@member_attributes[:name])
      expect(JSON.parse(response.body)["email"]).to eq(@member_attributes[:email])
      expect(JSON.parse(response.body)["campaign_id"]).to eq(@member_attributes[:campaign_id])
    end

    it "Must have created member with success" do
      post :create, params: {member: @member_attributes}
      expect(Member.last.name).to eq(@member_attributes[:name])
      expect(Member.last.email).to eq(@member_attributes[:email])
      expect(Member.last.campaign_id).to eq(@member_attributes[:campaign_id])
    end

    it "returns json error" do
      @member_attributes = FactoryBot.attributes_for(:member, name: nil).merge!(campaign_id: FactoryBot.create(:campaign).id)
      post :create, params: {member: @member_attributes}
      expect(response.status).to eq(422)
      expect(JSON.parse(response.body)["name"].first).to eq("can't be blank")
    end
  end

  describe "DELETE #destroy" do
    context "User is the Campaign Owner" do
      it "returns http success" do
        @member = FactoryBot.create(:member, campaign: FactoryBot.create(:campaign, user: @current_user))
        delete :destroy, params: {id: @member.id}
        expect(response).to have_http_status(:success)
      end
    end

    context "User isn't the Campaign Owner" do
      it "returns http forbidden" do
        @member = FactoryBot.create(:member)
        delete :destroy, params: {id: @member.id}
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe "POST #update" do
    before(:each) do
      @new_member_attributes = attributes_for(:member)
    end

    context "User is the Campaign Owner" do
      before(:each) do
        @member = create(:member, campaign: FactoryBot.create(:campaign, user: @current_user))
        put :update, params: {id: @member.id, member: @new_member_attributes}
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "Member have the new attributes" do
        expect(Member.last.name).to eq(@new_member_attributes[:name])
        expect(Member.last.email).to eq(@new_member_attributes[:email])
      end
    end

    context "User isn't the Campaign Owner" do
      it "returns http forbidden" do
        @member = create(:member)
        put :update, params: {id: @member.id, member: @new_member_attributes}
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe "GET #opened" do
    before(:each) do
      @member = create(:member)
      @member.set_pixel
      get :opened, params: {token: @member.token}
    end

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'returns blank pixel' do
      expect(response.body).to eq (Base64.decode64("R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="))
    end
  end
end
