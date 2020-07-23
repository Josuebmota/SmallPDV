/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductCategorySchema extends Schema {
  up() {
    this.create('product_categories', (table) => {
      table.increments();
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
      table.unique(['product_id', 'category_id']);
    });
  }

  down() {
    this.drop('product_categories');
  }
}

module.exports = ProductCategorySchema;
