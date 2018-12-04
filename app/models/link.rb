require 'base62-rb'
require 'uri'

class Link < ActiveRecord::Base

  validates :long_url, http_url: true

  def self.get_or_create_from_params(params)
    link = self.find_by(params)

    if !link
      long_url = Link.append_http(params)
      
      begin
        link = Link.create({long_url: long_url})
        short_url = Base62.encode(link.id)
        link.short_url = short_url
        LinkTitleWorker.perform_async(link.id)
          
        if !link.save
          link = false
        end;
      rescue NoMethodError
        raise
        return link
      end
    end
    
    link
  end

  def self.get_from_short_url(short_url)
    link = self.find_by(short_url)
    if link
      return link
    else
      return false
    end
  end

  def self.hash_from_controller_params(controller_params)
    return controller_params.to_h
  end

  def self.append_http(params)
    long_url = Link.hash_from_controller_params(params)[:long_url]
    url = URI.parse(long_url) rescue false
      
    if !(url.kind_of?(URI::HTTP) || url.kind_of?(URI::HTTPS)) && url.kind_of?(URI::Generic)
      return 'http://' + long_url
    end

    return long_url
  end

end