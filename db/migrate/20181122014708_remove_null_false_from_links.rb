class RemoveNullFalseFromLinks < ActiveRecord::Migration[5.2]
  def change
    change_column :links, :long_link, :string, null: true
    change_column :links, :short_link, :string, null: true
  end
end
