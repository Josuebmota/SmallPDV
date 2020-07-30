/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Order extends Model {
  client() {
    return this.belongsTo('App/Models/Client');
  }

  products() {
    return this.belongsToMany('App/Models/Product').pivotModel(
      'App/Models/OrderProduct'
    );
  }
}

module.exports = Order;
