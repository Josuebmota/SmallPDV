/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class StockAction extends Model {
  stocks() {
    return this.belongsTo('App/Models/Product');
  }
}

module.exports = StockAction;
