/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Stock extends Model {
  products() {
    return this.belongsTo('App/Models/Product');
  }

  stockactions() {
    return this.hasMany('App/Models/StockAction');
  }
}

module.exports = Stock;
