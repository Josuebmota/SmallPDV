'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use('App/Models/Category');
const Employee = use('App/Models/Employee');

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    const categories = await Category.query().fetch();
    response.status(200).json(categories);
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // "label": "Cereais",
  // "parent_id": null,
  // "child_count": 2,
  // "created_at": "16/06/2020 18:24:00",
  // "updated_at": "16/06/2020 18:24:00"
  async store({ request, response }) {
    await auth.check();

    const isAdm = await Employee.findBy('user_id', auth.user.id);
    if (isAdm.type !== 'ADM')
      return response.status(401).json({ message: 'Não autorizado' });

    const data = request.only(['level', 'label', 'parent_id', 'child_count']);

    const category = await Category.create(data);
    return category;
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let category = await Category.findOrFail(params.id);
    return category;
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    await auth.check();

    const isAdm = await Employee.findBy('user_id', auth.user.id);
    if (isAdm.type !== 'ADM')
      return response.status(401).json({ message: 'Não autorizado' });

    const category = await Category.findOrFail(params.id);

    const data = request.all();
    category.merge(data);
    await category.save();

    return response.status(200).json(category);
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    await auth.check();

    const isAdm = await Employee.findBy('user_id', auth.user.id);
    if (isAdm.type !== 'ADM')
      return response.status(401).json({ message: 'Não autorizado' });


    const category = await Category.findOrFail(params.id);

    // if (category.user_id !== auth.user.id) {
    //   return response.status(401).send({ error: 'Not authorized' })
    // }

    await category.delete();
    return response.status(200).send();
  }
}

module.exports = CategoryController;
