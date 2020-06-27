/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Client = use('App/Models/Client');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Address = use('App/Models/Address');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telephone = use('App/Models/Telephone');

const Database = use('Database');

class ClientController {
  async store({ auth, request, response }) {
    await auth.check();

    const trx = await Database.beginTransaction();

    const dataUser = request.only(['name', 'email', 'cpf']);

    const dataClient = request.only(['money']);

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

    const { saldo } = await Client.create({ user_id: id, ...dataClient }, trx);

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

    return response.status(201).json({
      newClients: { id, nome, email, saldo, dataAddress, dataTelephone },
    });
  }

  async index({ auth, response }) {
    await auth.check();

    const client = await Database.select(
      'clients.id',
      'user_id',
      'name',
      'email',
      'money'
    )
      .from('users')
      .innerJoin('clients', 'users.id', 'clients.user_id');

    if (!client) {
      return response.status(404).json({ erro: 'There are no clients' });
    }

    return client;
  }

  async show({ auth, params, response }) {
    await auth.check();

    const client = await Database.select(
      'user_id',
      'clients.id',
      'name',
      'email',
      'cpf',
      'money'
    )
      .from('users')
      .innerJoin('clients', 'clients.user_id', 'users.id')
      .where('users.id', params.id)
      .first();

    if (!client) {
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

    return response.status(200).json({ client, address, telephone });
  }

  async update({ auth, params, request, response }) {
    await auth.check();

    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const userClient = await Client.findByOrFail('user_id', params.id);

    if (!userClient) {
      return response.status(400).json({ erro: 'User is not client' });
    }

    // Config Clients
    const user = await User.findOrFail(params.id);
    user.merge(request.all());
    await user.save();

    // Config Clients
    const dataClient = request.only(['money']);
    if (Object.entries(dataClient).length !== 0) {
      const employee = await Client.findByOrFail('user_id', params.id);
      employee.merge(dataClient);
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

    const userClient = await Client.findByOrFail('user_id', params.id);

    if (!userClient) {
      return response.status(400).json({ erro: 'User is not client' });
    }

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json('You are not authorized to delete');
    }

    const client = await User.findOrFail(params.id);

    await client.delete();

    return response.status(200).json({ delete: 'Deleted Client' });
  }
}

module.exports = ClientController;
