class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.text :content
      t.string :tags, :array => true
      t.boolean :done
      t.date :dateComplete

      t.timestamps
    end
  end
end
