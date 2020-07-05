/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Category extends Model {
  product_categories() {
    return this.hasMany('App/Models/ProductCategory');
  }
}

module.exports = Category;
