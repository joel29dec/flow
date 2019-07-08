class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :text
      t.boolean :done
      t.references :category, foreign_key: true
      t.timestamps
    end
  end
end
