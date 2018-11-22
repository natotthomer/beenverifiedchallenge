class RemoveUniquenessFromLinks < ActiveRecord::Migration[5.2]
  def change
    remove_index :links, :short_url
  end
end
