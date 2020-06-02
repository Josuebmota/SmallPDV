/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('cpf').notNullable().unique();
      table.string('celular').unique();
      table.string('telefone').unique();
      table.string('cep').notNullable();
      table.string('logradouro').notNullable();
      table.string('numero').notNullable();
      table.string('bairro').notNullable();
      table.string('cidade').notNullable();
      table.string('estado').notNullable();
      table.string('cargo').notNullable();
      table.string('password').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
