'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductCategorySchema extends Schema {
  up() {
    this.create('product_categories', (table) => {
      table.increments();
      table
        .integer('id_product')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('id_category')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
      table.unique(['id_product', 'id_category']);
    });
  }

  down() {
    this.drop('product_categories');
  }
}

module.exports = ProductCategorySchema;
