/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ProductCategory = use('App/Models/ProductCategory');

class ProductCategoryController {
  async store({ request, params, response }) {
    const { categories } = await request.get().categories;
    const product_id = params.id;

    const productCategories = categories
      .split(',')
      .map((category) => category.trim());

    const categoriasExists = await ProductCategory.query()
      .where('product_id', product_id)
      .whereIn(productCategories)
      .fetch();

    if (Object.entries(categoriasExists).length !== 0) {
      return response
        .status(400)
        .json({ message: 'Alguns desses items já foram cadastrados' });
    }

    const categorySelect = productCategories.map((category_id) => {
      return {
        product_id,
        category_id,
      };
    });

    await ProductCategory.createMany(categorySelect);

    return response
      .status(200)
      .json({ message: 'Novas categorias cadastradas para aquele produto' });
  }

  async destroy({ params, request, response }) {
    const { categories } = await request.get().categories;
    const product_id = params.id;

    const productCategories = categories
      .split(',')
      .map((category) => category.trim())
      .map((category_id) => {
        return {
          product_id,
          category_id,
        };
      });

    await ProductCategory.query()
      .where('product_id', product_id)
      .whereIn(productCategories)
      .delete();

    return response.status(200).send({
      message: 'Categoria atribuida a este produto foi excluída com sucesso.',
    });
  }
}

module.exports = ProductCategoryController;
