/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Database = use('Database');

class PerfilEmpregadoController {
  async index({ auth }) {
    await auth.check();

    const employee = await Database.select(
      'users.id',
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
      .from('users')
      .innerJoin('employees', 'users.id', 'employees.user_id')
      .innerJoin('addresses', 'users.id', 'addresses.user_id')
      .innerJoin('telephones', 'users.id', 'telephones.user_id')
      .where(' users.id', auth.user.id)
      .first();
    return employee;
  }
}

module.exports = PerfilEmpregadoController;
