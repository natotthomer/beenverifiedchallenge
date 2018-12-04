require 'base62-rb'

class Api::LinksController < ApplicationController

  def index
    links = Link.all.order(:id)
    render json: links
  end

  def create
    begin
      link = Link.get_or_create_from_params(create_params)
      render json: link
    rescue NoMethodError
      render json: {error: "URL is invalid"}, status: :unprocessable_entity
    end
    
  end

  def re_direct
    link = Link.get_from_short_url(short_url)

    if link
      link.counter += 1
      link.save

      redirect_to link.long_url
    else
      render json: "No link, sorry", status: :unprocessable_entity
    end
  end

  def top
    render json: Link.order(counter: :desc).limit(100)
  end

  private

  def create_params
    params.require('link').permit('long_url')
  end

  def short_url
    params.permit('short_url')
  end

end