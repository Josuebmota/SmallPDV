/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ProductCategory = use('App/Models/ProductCategory');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Stock = use('App/Models/Stock');

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
        'image'
      )
      .with('categories', (category) => {
        category.select('name');
      })
      .with('stocks')
      .paginate(page);

    response.status(200).json(products);
  }

  async store({ request, response }) {
    const dataProduct = await request.except([
      'amount',
      'minimum_stock',
      'categories',
    ]);

    const dataStock = await request.only(['amount', 'minimum_stock']);

    if (dataStock.amount <= dataStock.minimum_stock) {
      return response.status(400).json({
        message:
          'Quantidade não pode ser inicialmente menor do que o estoque minino',
      });
    }

    const { categories } = await request.only('categories');

    const trx = await Database.beginTransaction();

    const product = await Product.create(dataProduct, trx);

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

    await Stock.create(
      {
        product_id,
        ...dataStock,
      },
      trx
    );

    await trx.commit();

    return response.status(201).json({ product, productCategories });
  }

  async show({ params, response }) {
    const product = await Product.query()
      .with('categories')
      .with('stocks')
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
      return response.status(404).json({ message: 'Produto não encontrado' });

    const data = request.all();
    product.merge(data);
    await product.save();

    return response.status(204).json();
  }

  async destroy({ params, response, auth }) {
    const product = await Product.findByOrFail('id', params.id);

    if (!product)
      return response.status(404).json({ message: 'Produto não encontrado' });

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response
        .status(401)
        .json('Você não tem autorização para efetuar essa ação');
    }

    await product.delete(product);
    return response.status(204).json();
  }
}

module.exports = ProductController;
