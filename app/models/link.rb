require 'base62-rb'

class Link < ActiveRecord::Base

  # validates :short_url, uniqueness: true

  def self.get_or_create_from_long_url(long_url)
    link = self.find_by(long_url)
    
    if !link
      link = Link.create(long_url)
      short_url = Base62.encode(link.id)
      link.short_url = short_url
      link.save!
    end
    
    link
  end

  def self.get_from_route_params(short_url)
    link = self.find_by(short_url)
    if link
      return link
    else
      return false
    end
  end

end