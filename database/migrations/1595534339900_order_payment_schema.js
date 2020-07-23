/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OrderPaymentSchema extends Schema {
  up() {
    this.create('order_payments', (table) => {
      table.increments();
      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('paymethod_id')
        .unsigned()
        .references('id')
        .inTable('paymethots')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.decimal('value').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('order_payments');
  }
}

module.exports = OrderPaymentSchema;
