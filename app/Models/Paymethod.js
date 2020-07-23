/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Paymethod extends Model {
  orders() {
    return this.belongsToMany('App/Models/Order').pivotModel(
      'App/Models/OrderPayment'
    );
  }
}

module.exports = Paymethod;
