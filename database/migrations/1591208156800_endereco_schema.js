/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EnderecoSchema extends Schema {
  up() {
    this.create('enderecos', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('empregados')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('empregados')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('cep');
      table.string('logradouro');
      table.string('numero');
      table.string('bairro');
      table.string('cidade');
      table.string('estado');
      table.timestamps();
    });
  }

  down() {
    this.drop('enderecos');
  }
}

module.exports = EnderecoSchema;
