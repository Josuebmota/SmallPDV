/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Client extends Model {
  users() {
    return this.belongsTo('App/Models/User');
  }

  orders() {
    return this.hasMany('App/Models/Order');
  }
}

module.exports = Client;
