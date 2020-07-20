'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class StockSchema extends Schema {
  up() {
    this.create('stocks', (table) => {
      table.increments();
      table
        .integer('id_product')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE');
      table.integer('amount').unsigned();
      table.integer('minimum_stock').unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop('stocks');
  }
}

module.exports = StockSchema;
