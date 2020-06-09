/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EmpregadosSchema extends Schema {
  up() {
    this.create('empregados', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('cpf').notNullable().unique();
      table.string('celular').unique();
      table.string('telefone').unique();
      table.string('cep');
      table.string('logradouro');
      table.string('numero');
      table.string('bairro');
      table.string('cidade');
      table.string('estado');
      table.string('tipo').notNullable();
      table.string('password');
      table.timestamps();
    });
  }

  down() {
    this.drop('empregados');
  }
}

module.exports = EmpregadosSchema;
