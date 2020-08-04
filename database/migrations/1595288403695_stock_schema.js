/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class StockSchema extends Schema {
  up() {
    this.create('stocks', (table) => {
      table.increments();
      table
        .integer('product_id')
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
