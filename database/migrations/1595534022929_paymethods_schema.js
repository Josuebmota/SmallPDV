/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PaymethotsSchema extends Schema {
  up() {
    this.create('paymethods', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.decimal('tax').notNullable();
      table.boolean('clientTax').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('paymethods');
  }
}

module.exports = PaymethotsSchema;
