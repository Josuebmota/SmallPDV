/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  categories() {
    return this.belongsToMany('App/Models/Category').pivotModel(
      'App/Models/ProductCategory'
    );
  }
}

module.exports = Product;
