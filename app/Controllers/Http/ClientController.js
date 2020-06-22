/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Cliente = use('App/Models/Client');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Endereco = use('App/Models/Address');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telephone = use('App/Models/Telephone');

const Database = use('Database');

class ClientController {
  async store({ auth, request, response }) {
    await auth.check();

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

    const { id, nome, email } = await User.create(dataUser);

    const { saldo } = await Cliente.create({ user_id: id, ...dataCliente });

    if (Object.entries(dataEndereco).length !== 0) {
      await Endereco.create({
        user_id: id,
        ...dataEndereco,
      });
    }
    if (Object.entries(dataTelephone).length !== 0) {
      await Telephone.create({
        user_id: id,
        ...dataTelephone,
      });
    }

    return response.status(201).json({
      newClientes: { id, nome, email, saldo, dataEndereco, dataTelephone },
    });
  }

  async index({ auth }) {
    await auth.check();

    const cliente = await User.query()
      .with('clients')
      .with('addresses')
      .with('telephones')
      .fetch();

    if (!cliente) {
      return 'There are no clients';
    }

    delete cliente.cpf;

    return cliente;
  }

  async show({ auth, params }) {
    await auth.check();

    const cliente = await Database.table('users')
      .innerJoin('clients', 'users.id', 'clients.user_id')
      .innerJoin('addresses', 'users.id', 'addresses.user_id')
      .innerJoin('telephones', 'users.id', 'telephones.user_id')
      .where({ id: params.id })
      .fetch();

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
      const empregado = await Cliente.findByOrFail('user_id', params.id);
      empregado.merge(dataCliente);
    }

    return response.status(201).json({ update: 'Updated Client' });
  }

  async destroy({ params, response, auth }) {
    await auth.check();

    if (auth.user.tipo !== 'ADM') {
      return response.status(401).json('You are not authorized to delete');
    }

    const cliente = await User.findOrFail(params.id);

    await cliente.delete();

    return 'Deleted client';
  }
}

module.exports = ClientController;
