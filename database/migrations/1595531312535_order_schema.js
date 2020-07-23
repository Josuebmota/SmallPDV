/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OrderSchema extends Schema {
  up() {
    this.create('orders', (table) => {
      table.increments();
      table
        .integer('register_id')
        .unsigned()
        .references('id')
        .inTable('registers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('status');
      table.boolean('itsPaid').defaultTo(false);
      table.decimal('total');
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }
}

module.exports = OrderSchema;
