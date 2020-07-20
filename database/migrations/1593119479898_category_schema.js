'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CategorySchema extends Schema {
  up() {
    this.create('categories', (table) => {
      table.increments();
      table.integer('level').unsigned();
      table.string('name').unique();
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
