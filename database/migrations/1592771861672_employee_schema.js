/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EmployeeSchema extends Schema {
  up() {
    this.create('employees', (table) => {
      table.increments();
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('type').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('employees');
  }
}

module.exports = EmployeeSchema;
