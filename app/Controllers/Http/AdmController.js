/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Administrador = use('App/Models/Empregados');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

class AdmController {
  async store({ request, response }) {
    const { id, nome, email } = await Administrador.create(
      request.except(['password_confirmation'])
    );

    return response.status(201).json({ id, nome, email });
  }
}

module.exports = AdmController;
