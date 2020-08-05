/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category');

class CategoryController {
  async index({ response }) {
    const categories = await Category.all();
    response.status(200).json(categories);
  }

  async store({ request, response, auth }) {
    await auth.check();

    const isAdm = await Employee.findBy('user_id', auth.user.id);
    if (isAdm.type !== 'ADM')
      return response
        .status(401)
        .json('Você não tem autorização para efetuar essa ação');

    const data = request.only(['level', 'name', 'child_count']);

    const category = await Category.create(data);
    return category;
  }

  async show({ params }) {
    const category = await Category.findOrFail(params.id);
    return category;
  }
}

module.exports = CategoryController;
