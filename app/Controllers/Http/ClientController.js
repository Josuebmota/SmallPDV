/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Cliente = use('App/Models/Client');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Endereco = use('App/Models/Address');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telephone = use('App/Models/Telephone');

const Database = use('Database');

class ClientController {
  async store({ auth, request, response }) {
    await auth.check();

    const trx = await Database.beginTransaction();

    const dataUser = request.only(['name', 'email', 'cpf']);

    const dataCliente = request.only(['money']);

    const dataEndereco = request.only([
      'cep',
      'street',
      'number',
      'neighborhood',
      'city',
      'state',
    ]);

    const dataTelephone = request.only(['cellphone', 'telephone']);

    const { id, nome, email } = await User.create(dataUser, trx);

    const { saldo } = await Cliente.create(
      { user_id: id, ...dataCliente },
      trx
    );

    if (Object.entries(dataEndereco).length !== 0) {
      await Endereco.create(
        {
          user_id: id,
          ...dataEndereco,
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

    return response.status(201).json({
      newClientes: { id, nome, email, saldo, dataEndereco, dataTelephone },
    });
  }

  async index({ auth, response }) {
    await auth.check();

    const cliente = await User.query()
      .with('clients')
      .with('addresses')
      .with('telephones')
      .fetch();

    if (!cliente) {
      return response.status(404).json({ erro: 'There are no clients' });
    }

    return cliente;
  }

  async show({ auth, params, response }) {
    await auth.check();

    const cliente = await Database.table('users')
      .innerJoin('clients', 'users.id', 'clients.user_id')
      .with('addresses')
      .with('telephones')
      .where(' users.id', params.id)
      .first();

    if (!cliente) {
      return response.status(404).json({ notfound: 'User is not found' });
    }
    return cliente;
  }

  async update({ auth, params, request, response }) {
    await auth.check();

    // Config Clients
    const user = await User.findOrFail(params.id);
    user.merge(request.all());
    await user.save();

    // Config Clients
    const dataCliente = request.only(['saldo']);
    if (Object.entries(dataCliente).length !== 0) {
      const employee = await Cliente.findByOrFail('user_id', params.id);
      employee.merge(dataCliente);
      await employee.save();
    }

    return response.status(201).json({ update: 'Updated Client' });
  }

  async destroy({ params, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json('You are not authorized to delete');
    }

    const cliente = await User.findOrFail(params.id);

    await cliente.delete();

    return response.status(200).json({ delete: 'Deleted Client' });
  }
}

module.exports = ClientController;
