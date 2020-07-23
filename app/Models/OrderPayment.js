/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class OrderPayment extends Model {
  orders() {
    return this.belongsTo('App/Models/Order');
  }

  paymethods() {
    return this.belongsTo('App/Models/Paymethod');
  }
}

module.exports = OrderPayment;
