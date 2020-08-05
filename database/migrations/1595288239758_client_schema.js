/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClientSchema extends Schema {
  up() {
    this.create('clients', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.decimal('money');
      table.timestamps();
    });
  }

  down() {
    this.drop('clients');
  }
}

module.exports = ClientSchema;
