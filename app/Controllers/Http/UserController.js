/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async create({ request, response }) {
    const user = await User.create(request.except(['confirmapassword']));
    return response.status(201).json(user);
  }
}

module.exports = UserController;
