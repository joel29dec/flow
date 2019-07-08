# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
(1..4).each {|x| Category.create()}

Item.create(text: 'Fix flat tire', done: false, category_id: 1)
Item.create(text: 'Complete backend by midnight', done: false, category_id: 1)
Item.create(text: 'Go to the Gym', done: false, category_id: 2)
Item.create(text: 'Take out the Trash', done: false, category_id: 2)
Item.create(text: 'Reply to reddit comments', done: false, category_id: 3)
Item.create(text: 'Cleaning out Desktop Icons', done: false, category_id: 3)
Item.create(text: 'Watch Netflix', done: false, category_id: 4)
Item.create(text: 'Check Facebook', done: false, category_id: 4)