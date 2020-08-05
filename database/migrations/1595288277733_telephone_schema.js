/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TelephoneSchema extends Schema {
  up() {
    this.create('telephones', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('cellphone').unique();
      table.string('telephone').unique();
      table.timestamps();
    });
  }

  down() {
    this.drop('telephones');
  }
}

module.exports = TelephoneSchema;
