/* eslint-disable eqeqeq */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Database = use('Database');

class EmployeeController {
  async store({ request, auth, response }) {
    await auth.check();
    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json({
        message: 'Você não tem autorização para cadastrar empregados',
      });
    }

    const trx = await Database.beginTransaction();

    const dataUser = request.only(['name', 'email', 'cpf', 'password']);

    const dataEmployee = request.only(['type']);

    const { id, nome, email } = await User.create(dataUser, trx);

    const { type } = await Employee.create(
      { user_id: id, ...dataEmployee },
      trx
    );

    trx.commit();

    return response.status(201).json({ id, nome, email, type });
  }

  async index({ auth, response }) {
    await auth.check();
    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json({
        message: 'Você não tem autorização para listar empregados',
      });
    }

    const employees = await Database.select(
      'employees.id',
      'user_id',
      'name',
      'email',
      'type'
    )
      .from('users')
      .innerJoin('employees', 'users.id', 'employees.user_id');

    if (!employees) {
      return response
        .status(200)
        .json({ message: 'Não foi encontrado nenhum cliente' });
    }

    return employees;
  }

  async show({ params, auth, response }) {
    await auth.check();
    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json({
        message: 'Você não tem autorização para listar empregados',
      });
    }

    const userEmployee = await Employee.findByOrFail('user_id', params.id);

    if (!userEmployee) {
      return response.status(400).json({ erro: 'Usuário não é um empregado' });
    }

    const employee = await User.query()
      .select('id', 'name', 'email', 'cpf')
      .with('employees')
      .with('addresses')
      .with('telephones')
      .where('id', params.id)
      .fetch();

    if (!employee) {
      return response.status(404).json({ notfound: 'User is not found' });
    }

    return response.status(200).json({ employee });
  }

  async update({ params, request, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const userEmployee = await Employee.findByOrFail('user_id', params.id);

    if (!userEmployee) {
      return response.status(400).json({ erro: 'Usuário não é um empregado' });
    }

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type === 'ADM' || admExists.user_id == params.id) {
      // Config User
      const user = await User.findOrFail(params.id);
      const dataUser = request.only(['name', 'email', 'cpf', 'password']);
      await user.merge(dataUser);
      await user.save();

      // Config Employee
      const dataEmpregado = request.only(['type']);
      if (Object.entries(dataEmpregado).length !== 0) {
        const employee = await Employee.findByOrFail('user_id', params.id);
        await employee.merge(dataEmpregado);
        await employee.save();
      }

      return response.status(201).json({ updated: 'Cliente Atualizado' });
    }

    return response.status(401).json({
      message: 'Você não tem autorização para atualizar empregados',
    });
  }

  async destroy({ params, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ notfound: 'Usuário não encontrado' });
    }

    const userEmployee = await Employee.findByOrFail('user_id', params.id);

    if (!userEmployee) {
      return response.status(400).json({ erro: 'Usuário não é um empregado' });
    }

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type === 'ADM' || admExists.user_id == params.id) {
      const employee = await User.findOrFail(params.id);

      await employee.delete();

      return response.status(200).json({ message: 'Empregado deletado' });
    }
    return response.status(401).json({
      message: 'Você não tem autorização para deletar empregados',
    });
  }
}

module.exports = EmployeeController;
