/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Employee extends Model {
  users() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Employee;
