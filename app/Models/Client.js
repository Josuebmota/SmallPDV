/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Client extends Model {
  users() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Client;
