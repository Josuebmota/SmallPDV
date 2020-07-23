/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ProductCategory extends Model {
  products() {
    return this.belongsTo('App/Models/Product');
  }

  categories() {
    return this.belongsTo('App/Models/Category');
  }
}

module.exports = ProductCategory;
