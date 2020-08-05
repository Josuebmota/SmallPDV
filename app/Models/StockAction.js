/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class StockAction extends Model {
  stocks() {
    return this.belongsTo('App/Models/Stock');
  }
}

module.exports = StockAction;
