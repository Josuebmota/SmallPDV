'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');
const ProductCategory = use ('App/Models/ProductCategory');
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
  async index({ request, response, view }) {
    const products = await Product.query().fetch();
    console.log(products.toJSON());

    response.status(200).json(products);
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
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
    const product = await Product.create(data);

    const categories = request.only('categories');
    if(categories){
      categories['categories'].map(async (id)=>{
        await ProductCategory.create(
          {
            id_category:id,
            id_product:product.id
          });
      });
    }

    return product;
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
    return product;
  }
  /*
  * Display a single product by bar_code or internal_code
  * GET products/code/:code
  */
  async showByCode({ params, response }) {
    let product;
    product = await Product.findBy('bar_code', params.code);
    if (!product) product = await Product.findBy('internal_code', params.code);

    if (product) {
      return product;
    } else {
      response.send({});
    }
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
    const product = await Product.findOrFail(params.id);

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
  async destroy({ params,response}) {
    const product = await Product.findOrFail(params.id);

    // if (product.user_id !== auth.user.id) {
    //   return response.status(401).send({ error: 'Not authorized' })
    // }

    await product.delete();
    return response.status(200).send();
  }
}

module.exports = ProductController;
