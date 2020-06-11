/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TokensSchema extends Schema {
  up() {
    this.create('tokens', (table) => {
      table.increments();
      table
        .integer('empregados_id')
        .unsigned()
        .references('id')
        .inTable('empregados');
      table.string('token', 255).notNullable().unique().index();
      table.string('type', 80).notNullable();
      table.boolean('is_revoked').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('tokens');
  }
}

module.exports = TokensSchema;
