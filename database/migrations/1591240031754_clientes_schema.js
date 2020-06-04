/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClientesSchema extends Schema {
  up() {
    this.create('clientes', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.string('email').unique();
      table.string('cpf').unique();
      table.integer('saldo');
      table.timestamps();
    });
  }

  down() {
    this.drop('clientes');
  }
}

module.exports = ClientesSchema;
