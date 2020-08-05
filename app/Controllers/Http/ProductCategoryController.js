/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ProductCategory = use('App/Models/ProductCategory');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');

async function deleteCategories(product_id, category_id) {
  await ProductCategory.query()
    .where('product_id', product_id)
    .where('category_id', category_id)
    .delete();
}

class ProductCategoryController {
  async store({ request, params, response, auth }) {
    await auth.check();
    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json({
        message: 'Você não tem autorização para efetuar essa ação',
      });
    }
    const { categories } = await request.get().categories;
    const { product_id } = params;

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

  async destroy({ params, request, response, auth }) {
    await auth.check();

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json({
        message: 'Você não tem autorização para efetuar essa ação',
      });
    }

    const categories = await request.get().categories;
    const { product_id } = params;

    const categoriesAll = categories
      .split(',')
      .map((category) => category.trim())
      .map((category_id) => {
        return category_id;
      });

    for (let index = 0; index < categoriesAll.length; index += 1) {
      deleteCategories(product_id, categoriesAll[index]);
    }

    return response.status(204).json();
  }
}

module.exports = ProductCategoryController;
