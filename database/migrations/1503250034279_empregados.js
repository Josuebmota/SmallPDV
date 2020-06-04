/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('empregados', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('cpf').notNullable().unique();
      table.string('tipo').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('empregados');
  }
}

module.exports = UserSchema;
