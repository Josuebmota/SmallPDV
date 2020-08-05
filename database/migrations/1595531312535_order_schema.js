/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OrderSchema extends Schema {
  up() {
    this.create('orders', (table) => {
      table.increments();
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE');
      table.decimal('total').notNullable().unsigned();
      table.decimal('cost').notNullable().unsigned();
      table.decimal('payback').notNullable().unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }
}

module.exports = OrderSchema;
