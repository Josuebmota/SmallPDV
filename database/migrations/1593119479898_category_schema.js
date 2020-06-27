'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CategorySchema extends Schema {
  up() {
    // {
    //   "id": 1,
    //   "level": 0,
    //   "label": "Cereais",
    //   "parent_id": null,
    //   "child_count": 2,
    //   "created_at": "16/06/2020 18:24:00",
    //   "updated_at": "16/06/2020 18:24:00"
    // }
    this.create('categories', (table) => {
      table.increments();
      table.integer('level').unsigned();
      table.string('label').unique();
      table
        .integer('parent_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE');
      table.integer('child_count');
      table.string('image');
      table.timestamps();
    });
  }

  down() {
    this.drop('categories');
  }
}

module.exports = CategorySchema;
