/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ProductCategory = use('App/Models/ProductCategory');
const Category = use('App/Models/Category');

const DB = use('Database');
/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   */
  async index({ response }) {
    const products = await DB.select(
      'products.id',
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
      'category_id',
      'level',
      'label',
      'parent_id',
      'child_count',
      'image'
    )
      .from('products')
      .innerJoin(
        'product_categories',
        'product_categories.product_id',
        'products.id'
      )
      .innerJoin(
        'categories',
        'categories.id',
        'product_categories.category_id'
      );

    response.status(200).send(products);
  }

  /**
   * Create/save a new product.
   * POST products
   */
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

    const trx = await DB.beginTransaction();

    const product = await Product.create(data, trx);
    const { categories } = request.only('categories');

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

  /**
   * Display a single product.
   * GET products/:id
   */
  async show({ params }) {
    const product = await Product.findOrFail(params.id);

    const relations = await ProductCategory.query()
      .where('id_product', product.id)
      .fetch();
    let category = null;
    if (relations.rows.length > 0) {
      category = [];
      for (const relation of relations.rows) {
        category.push(await Category.findOrFail(relation.id_category));
      }
    }
    const data = { ...product.$attributes, category };

    return data;
  }

  /*
   * Display a single product by bar_code or internal_code
   * GET products/code/:code
   */
  async showByCode({ params, response }) {
    let product;
    product = await Product.findBy('bar_code', params.code);
    if (!product) product = await Product.findBy('internal_code', params.code);
    if (!product)
      return response.status(404).send({ message: 'Produto não encontrado' });
    return response.status(200).json(product);
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const product = await Product.findBy('id', params.id);
    if (!product)
      return response.status(404).send({ message: 'Produto não encontrado' });

    const data = request.all();
    product.merge(data);
    await product.save();

    return response.status(200).json(product);
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const product = await Product.findBy('id', params.id);
    const trx = await DB.beginTransaction();

    if (!product)
      return response.status(404).send({ message: 'Produto não encontrado' });

    try {
      await product.delete(trx);
      await trx.commit();
      return response
        .status(200)
        .send({ message: 'Produto excluído com sucesso.' });
    } catch (err) {
      await trx.rollback();

      return response.status(err.status).send(err.message);
    }
  }
}

module.exports = ProductController;
