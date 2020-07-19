/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ProductCategory = use('App/Models/ProductCategory');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Database = use('Database');

class ProductController {
  async index({ response, request }) {
    const page = request.get().page || 1;

    const products = await Product.query()
      .select(
        'products.id',
        'name',
        'cost_price',
        'sell_price',
        'bar_code',
        'internal_code',
        'show_online',
        'unity',
        'image'
      )
      .with('categories', (category) => {
        category.select('label');
      })
      .paginate(page);

    response.status(200).send(products);
  }

  async store({ request, response }) {
    const data = request.only([
      'name',
      'bar_code',
      'internal_code',
      'description',
      'cost_price',
      'sell_price',
      'to_sell',
      'show_online',
      'unity',
      'fraction_sell',
      'stock_control',
    ]);

    const trx = await Database.beginTransaction();

    const product = await Product.create(data, trx);
    const { categories } = await request.only('categories');

    const product_id = product.id;
    const productCategories = categories
      .split(',')
      .map((category) => category.trim())
      .map((category_id) => {
        return {
          product_id,
          category_id,
        };
      });

    await ProductCategory.createMany(productCategories, trx);
    await trx.commit();

    response.status(201).send({ product, productCategories });
  }

  async show({ params, response }) {
    const product = await Product.query()
      .with('categories')
      .where('products.id', params.id)
      .fetch();

    if (product.rows.length === 0) {
      return response.status(404).json({ message: 'Produto não encontrado' });
    }

    return product;
  }

  async update({ params, request, response }) {
    const product = await Product.findBy('id', params.id);

    if (!product)
      return response.status(404).send({ message: 'Produto não encontrado' });

    const data = request.all();
    product.merge(data);
    await product.save();

    return response.status(200).json(product);
  }

  async destroy({ params, response, auth }) {
    const product = await Product.findBy('id', params.id);

    if (!product)
      return response.status(404).send({ message: 'Produto não encontrado' });

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json('Você não tem autorização para deletar');
    }

    await product.delete(product);
    return response
      .status(200)
      .send({ message: 'Produto excluído com sucesso.' });
  }
}

module.exports = ProductController;
