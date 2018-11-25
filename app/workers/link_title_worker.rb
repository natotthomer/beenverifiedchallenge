require 'open-uri'

class LinkTitleWorker
  include Sidekiq::Worker
  sidekiq_options :retry => false

  def perform(link_id)
    link = Link.find(link_id)
    page = Nokogiri::HTML(open(link.long_url))
    link.title = page.css('title')[0].text
    link.save!
  end
end