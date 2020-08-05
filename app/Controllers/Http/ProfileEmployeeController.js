/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class PerfilEmpregadoController {
  async index({ auth }) {
    await auth.check();

    const employee = await User.query()
      .select('id', 'name', 'email', 'cpf')
      .with('employees')
      .with('addresses')
      .with('telephones')
      .where(' users.id', auth.user.id)
      .first();
    return employee;
  }
}

module.exports = PerfilEmpregadoController;
