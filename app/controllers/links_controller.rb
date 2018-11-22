require 'base62-rb'

class LinksController < ApplicationController

  def index
    links = Link.all
    render json: links
  end

  def create
    link = Link.get_or_create_from_long_url(link_params)
    
    render json: link
  end

  private

  def link_params
    params.require('link').permit('long_url')
  end

end