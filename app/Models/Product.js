/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  categories() {
    return this.belongsToMany('App/Models/Category').pivotModel(
      'App/Models/ProductCategory'
    );
  }

  orders() {
    return this.belongsToMany('App/Models/Order').pivotModel(
      'App/Models/OrderProduct'
    );
  }

  stocks() {
    return this.hasOne('App/Models/Stock');
  }
}

module.exports = Product;
