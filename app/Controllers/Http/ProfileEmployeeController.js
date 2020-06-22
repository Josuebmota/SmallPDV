/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class PerfilEmpregadoController {
  async index({ auth }) {
    await auth.check();
    const empregado = await User.query()
      .select(
        'id',
        'name',
        'cpf',
        'cellphone',
        'telephone',
        'cep',
        'street',
        'number',
        'neighborhood',
        'city',
        'state',
        'type'
      )
      .where({ id: auth.user.id })
      .fetch();
    return empregado;
  }
}

module.exports = PerfilEmpregadoController;
