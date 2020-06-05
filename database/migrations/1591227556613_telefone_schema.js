/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TelefoneSchema extends Schema {
  up() {
    this.create('telefones', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('celular').unique();
      table.string('telefone').unique();
      table.timestamps();
    });
  }

  down() {
    this.drop('telefones');
  }
}

module.exports = TelefoneSchema;
