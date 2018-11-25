class AddCounterToLinks < ActiveRecord::Migration[5.2]
  def change
    add_column :links, :counter, :integer, :default => 0
  end
end
