class CreateLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :links do |t|
      t.string :long_link, null=false
      t.string :short_link, null=false
    end

    add_index :links, :short_link, unique: true
  end
end
