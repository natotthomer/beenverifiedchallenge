require 'open-uri'
require 'uri'

class LinkTitleWorker
  include Sidekiq::Worker
  sidekiq_options :retry => false

  def perform(link_id)
    link = Link.find(link_id)
    uri = URI(link.long_url)
    if uri.instance_of?(URI::Generic)
        uri = URI::HTTP.build({:host => uri.to_s}) 
    end
    page = Nokogiri::HTML(open(uri))
    link.title = page.css('title')[0].text
    link.save!
  end
end