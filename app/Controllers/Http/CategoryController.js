/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category');

const Employee = use('App/Models/Employee');

class CategoryController {
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

  async store({ request, response }) {
    await auth.check();

    const isAdm = await Employee.findBy('user_id', auth.user.id);
    if (isAdm.type !== 'ADM')
      return response.status(401).json({ message: 'Não autorizado' });

    const data = request.only(['level', 'label', 'parent_id', 'child_count']);

    const category = await Category.create(data);
    return category;
  }

  async show({ params }) {
    const category = await Category.findOrFail(params.id);
    return category;
  }

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
  async destroy({ params, response, auth }) {

    await auth.check();

    const isAdm = await Employee.findBy('user_id', auth.user.id);
    if (isAdm.type !== 'ADM')
      return response.status(401).json({ message: 'Não autorizado' });

    const category = await Category.findOrFail(params.id);

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json({
        unauthorized: 'Você não tem autorização para efetuar essa ação',
      });
    }

    await category.delete();
    return response.status(200).send();
  }
}

module.exports = CategoryController;
