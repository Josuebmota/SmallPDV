/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UsersSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('cpf').notNullable().unique();
      table.string('tipo').notNullable();
      table.string('saldo');
      table.string('password');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UsersSchema;
