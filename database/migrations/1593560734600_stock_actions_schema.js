'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class StockActionsSchema extends Schema {
  up() {
    this.create('stock_actions', (table) => {
      table.increments();
      table.string('type').notNullable();
      table
        .integer('stock_id')
        .unsigned()
        .references('id')
        .inTable('stocks')
        .onDelete('CASCADE');
      table.integer('amount').unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop('stock_actions');
  }
}

module.exports = StockActionsSchema;
