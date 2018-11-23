require 'base62-rb'
require_relative '../workers/link_title_worker'

class LinksController < ApplicationController

  def index
    links = Link.all
    render json: links
  end

  def create
    link = Link.get_or_create_from_long_url(create_params)

    LinkTitleWorker.perform_async(link.id)
    
    render json: link
  end

  def re_direct
    link = Link.get_from_route_params(route_params)

    if link
      redirect_to link.long_url
    else
      render json: "No link, sorry"
    end
  end

  private

  def create_params
    params.require('link').permit('long_url')
  end

  def route_params
    params.permit('short_url')
  end

end