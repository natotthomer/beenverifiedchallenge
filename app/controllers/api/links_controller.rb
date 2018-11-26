require 'base62-rb'

class Api::LinksController < ApplicationController

  def index
    links = Link.all.order(:id)
    render json: links
  end

  def create
    link = Link.get_or_create_from_long_url(create_params)
    
    render json: link
  end

  def re_direct
    link = Link.get_from_route_params(route_params)

    if link
      link.counter += 1
      link.save

      redirect_to link.long_url
    else
      render json: "No link, sorry"
    end
  end

  def top
    render json: Link.order(counter: :desc).limit(100)
  end

  private

  def create_params
    params.require('link').permit('long_url')
  end

  def route_params
    params.permit('short_url')
  end

end