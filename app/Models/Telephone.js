/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Telephone extends Model {
  users() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Telephone;
