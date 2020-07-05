/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductsSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('bar_code').unique();
      table.string('internal_code').unique();
      table.string('description');
      table.decimal('cost_price').notNullable();
      table.decimal('sell_price').notNullable();
      table.boolean('to_sell').notNullable();
      table.boolean('show_online').notNullable();
      table.string('unity');
      table.boolean('fraction_sell').notNullable();
      table.boolean('stock_control').notNullable();
      table.string('image');
      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductsSchema;
