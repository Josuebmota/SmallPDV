/* eslint-disable eqeqeq */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Address = use('App/Models/Address');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telephone = use('App/Models/Telephone');

const Database = use('Database');

class EmployeeController {
  async store({ request, auth, response }) {
    await auth.check();
    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response
        .status(401)
        .json({ unauthorized: 'You are not authorized to list employees' });
    }

    const trx = await Database.beginTransaction();

    const dataUser = request.only(['name', 'email', 'cpf', 'password']);

    const dataEmployee = request.only(['type']);

    const dataAddress = request.only([
      'cep',
      'street',
      'number',
      'neighborhood',
      'city',
      'state',
    ]);

    const dataTelephone = request.only(['cellphone', 'telephone']);

    const { id, nome, email } = await User.create(dataUser, trx);

    const { type } = await Employee.create(
      { user_id: id, ...dataEmployee },
      trx
    );

    if (Object.entries(dataAddress).length !== 0) {
      await Address.create(
        {
          user_id: id,
          ...dataAddress,
        },
        trx
      );
    }
    if (Object.entries(dataTelephone).length !== 0) {
      await Telephone.create(
        {
          user_id: id,
          ...dataTelephone,
        },
        trx
      );
    }

    trx.commit();

    return response
      .status(201)
      .json({ id, nome, email, type, dataAddress, dataTelephone });
  }

  async index({ auth, response }) {
    await auth.check();
    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response
        .status(401)
        .json({ unauthorized: 'You are not authorized to list employees' });
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
      return 'There are no registered employees';
    }

    return employees;
  }

  async show({ params, auth, response }) {
    await auth.check();
    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response
        .status(401)
        .json({ unauthorized: 'You are not authorized to list employees' });
    }

    const employee = await Database.select(
      'employees.id',
      'user_id',
      'name',
      'email',
      'type'
    )
      .from('users')
      .innerJoin('employees', 'employees.user_id', 'users.id')
      .where('users.id', params.id)
      .first();

    if (!employee) {
      return response.status(404).json({ notfound: 'User is not found' });
    }

    const address = await Database.select(
      'id',
      'cep',
      'street',
      'number',
      'neighborhood',
      'city',
      'state'
    )
      .from('addresses')
      .where('user_id', params.id);

    const telephone = await Database.select('id', 'cellphone', 'telephone')
      .from('telephones')
      .where('user_id', params.id);

    return response.status(200).json({ employee, address, telephone });
  }

  async update({ params, request, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const userEmployee = await Employee.findByOrFail('user_id', params.id);

    if (!userEmployee) {
      return response.status(400).json({ erro: 'User is not Employee' });
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

      return response.status(201).json({ update: 'Updated Employee' });
    }

    return response
      .status(401)
      .json({ unauthorized: 'You are not authorized to list employees' });
  }

  async destroy({ params, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const userEmployee = await Employee.findByOrFail('user_id', params.id);

    if (!userEmployee) {
      return response.status(400).json({ erro: 'User is not Employee' });
    }

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type === 'ADM' || admExists.user_id == params.id) {
      const employee = await User.findOrFail(params.id);

      await employee.delete();

      return response.status(200).json({ delete: 'Deleted Employee' });
    }
    return response
      .status(401)
      .json({ unauthorized: 'You are not authorized to list employees' });
  }
}

module.exports = EmployeeController;
