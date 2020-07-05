/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category');

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  async index({ response }) {
    const categories = await Category.query().fetch();
    response.status(200).json(categories);
  }

  /**
   * Create/save a new category.
   * POST categories
   */
  // "label": "Cereais",
  // "parent_id": null,
  // "child_count": 2,
  // "created_at": "16/06/2020 18:24:00",
  // "updated_at": "16/06/2020 18:24:00"

  async store({ request }) {
    const data = request.only(['level', 'label', 'parent_id', 'child_count']);

    const category = await Category.create(data);
    return category;
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   */
  async show({ params }) {
    const category = await Category.findOrFail(params.id);
    return category;
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   */
  async update({ params, request, response }) {
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
   */
  async destroy({ params, response, auth }) {
    const category = await Category.findOrFail(params.id);

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json('You are not authorized to delete');
    }

    await category.delete();
    return response.status(200).send();
  }
}

module.exports = CategoryController;
