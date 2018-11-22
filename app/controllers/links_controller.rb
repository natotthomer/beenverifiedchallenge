class LinksController < ApplicationController
  def index
    links = Link.all
    render json: links
  end

  def create
    create_params = link_params
    link = Link.create_link_from_long_url(create_params)
    render json: link
  end

  private

  def link_params
    params.require('link').permit('long_link')
  end
end