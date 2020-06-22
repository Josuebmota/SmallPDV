/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Address = use('App/Models/Address');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telephone = use('App/Models/Telephone');

class EmployeeController {
  async store({ request, auth, response }) {
    await auth.check();
    if (auth.user.type !== 'ADM') {
      return response
        .status(401)
        .json('You are not authorized to register employees');
    }

    const dataUser = request.only(['name', 'email', 'cpf']);

    const dataEmployee = request.only(['type,password']);

    const dataAddress = request.only([
      'cep',
      'street',
      'number',
      'neighborhood',
      'city',
      'state',
    ]);

    const dataTelephone = request.only(['cellphone', 'telephone']);

    const { id, nome, email } = await User.create(dataUser);

    const { type } = await Employee.create({ user_id: id, ...dataEmployee });

    if (Object.entries(dataAddress).length !== 0) {
      await Address.create({
        user_id: id,
        ...dataAddress,
      });
    }
    if (Object.entries(dataTelephone).length !== 0) {
      await Telephone.create({
        user_id: id,
        ...dataTelephone,
      });
    }

    return response
      .status(201)
      .json({ id, nome, email, type, dataAddress, dataTelephone });
  }

  async index({ auth, response }) {
    await auth.check();
    if (auth.user.type !== 'ADM') {
      return response
        .status(401)
        .json('You are not authorized to list employees');
    }

    const employees = await User.query()
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
      .with('employees')
      .with('addresses')
      .with('telephones')
      .where({ type: 'EMPREGADO' })
      .fetch();

    if (!employees) {
      return 'There are no registered employees';
    }

    return employees;
  }

  async show({ params, auth }) {
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
      .with('employees')
      .with('addresses')
      .with('telephones')
      .where({ id: params.id })
      .fetch();

    return empregado;
    // Lembrar das autorizações
  }

  async update({ params, request, response, auth }) {
    await auth.check();
    // Config User
    const user = await User.findOrFail(params.id);
    const dataUser = request.only(['nome', 'email', 'cpf']);
    user.merge(dataUser);
    await user.save();

    // Config Employee
    const dataEmpregado = request.only(['type,password']);
    if (Object.entries(dataEmpregado).length !== 0) {
      const empregado = await User.findByOrFail('user_id', params.id);
      empregado.merge(dataEmpregado);
    }

    return response.status(201).json({ update: 'Updated Employee' });
    // Lembrar das autorizações
  }

  async destroy({ params, response, auth }) {
    await auth.check();

    if (auth.user.tipo !== 'ADM') {
      return response
        .status(401)
        .json('You are not authorized to remove this employee');
    }

    const empregado = await User.findOrFail(params.id);

    await empregado.delete();

    return 'Deleted employee';
  }
}

module.exports = EmployeeController;
