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
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.decimal('total');
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }
}

module.exports = OrderSchema;
