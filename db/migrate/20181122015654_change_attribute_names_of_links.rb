class ChangeAttributeNamesOfLinks < ActiveRecord::Migration[5.2]
  def change
    rename_column :links, :long_link, :long_url
    rename_column :links, :short_link, :short_url
  end
end
