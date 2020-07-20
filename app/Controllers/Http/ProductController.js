'use strict';

const { Database } = require('sqlite3');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');
const ProductCategory = use('App/Models/ProductCategory');
const Category = use('App/Models/Category');
const Stock = use ('App/Models/Stock');
const DB = use('Database');
/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    const products = await Product.query().fetch();

    let data = [];
    for (const product of products.rows) {
      let newProduct = { ...product.$attributes};

      if (product.stock_control){
        const stock = await Stock.query().select('amount').where('id_product',product.id).fetch();
        newProduct = {...newProduct,amount:stock.rows[0].amount};
      }

      const relations = await ProductCategory.query()
        .where('id_product', product.id)
        .select(['id_category'])
        .fetch();
      let category = null;

      if (relations.rows.length > 0) {
        category = [];
        for (const relation of relations.rows) {
          category.push(await Category.findOrFail(relation.id_category));
        }

      }
      newProduct = {...newProduct,category:category};
      data.push(newProduct);
    }
    response.status(200).send(data);
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
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

    try {
      const id = await Product.getMax('id');
      let product = await Product.create({ ...data, id: id + 1 }, trx);
      const categories = request.only('categories');
      var category = null;

      if (categories) {
        category = [];
        for (const id of categories['categories']) {
          await ProductCategory.create(
            {
              id_category: id,
              id_product: product.id,
            },
            trx
          );
          const categoryData = await Category.findOrFail(id);
          category.push(categoryData.$attributes);
        }
      }
      await trx.commit();
      response.status(201).send({ ...product.$attributes, category: category });
    } catch (err) {
      response.status(500).send({ message: err.message });
      await trx.rollback();
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    let product = await Product.findOrFail(params.id);

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
    const data = { ...product.$attributes, category: category };

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
    else return response.status(200).json(product);
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
