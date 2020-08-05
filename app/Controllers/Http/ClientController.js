/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Client = use('App/Models/Client');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');

const Database = use('Database');

class ClientController {
  async store({ auth, request, response }) {
    await auth.check();

    const trx = await Database.beginTransaction();

    const dataUser = request.only(['name', 'email', 'cpf']);

    const dataClient = request.only(['money']);

    const { id, nome, email } = await User.create(dataUser, trx);

    const { saldo } = await Client.create({ user_id: id, ...dataClient }, trx);

    trx.commit();

    return response.status(201).json({
      newClient: { id, nome, email, saldo },
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
      return response
        .status(404)
        .json({ message: 'Não foi encontrado nenhum cliente' });
    }

    return client;
  }

  async show({ auth, params, response }) {
    await auth.check();
    const userClient = await Client.findByOrFail('user_id', params.user_id);

    if (!userClient) {
      return response.status(400).json({ message: 'Usuário não é um cliente' });
    }

    const client = await User.query()
      .select('id', 'name', 'email', 'cpf')
      .with('clients')
      .with('addresses')
      .with('telephones')
      .where('id', params.user_id)
      .fetch();

    if (!client) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    return response.status(200).json({ client });
  }

  async update({ auth, params, request, response }) {
    await auth.check();

    const userExists = await User.findByOrFail('id', params.user_id);

    if (!userExists) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const userClient = await Client.findByOrFail('user_id', params.user_id);

    if (!userClient) {
      return response.status(400).json({ message: 'Usuário não é um cliente' });
    }

    // Config Clients
    const user = await User.findOrFail(params.user_id);
    user.merge(request.all());
    await user.save();

    // Config Clients
    const dataClient = request.only(['money']);
    if (Object.entries(dataClient).length !== 0) {
      const client = await Client.findByOrFail('user_id', params.user_id);
      client.merge(dataClient);
      await client.save();
    }

    return response.status(204).json();
  }

  async destroy({ params, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.user_id);

    if (!userExists) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const userClient = await Client.findByOrFail('user_id', params.user_id);

    if (!userClient) {
      return response.status(400).json({ message: 'Usuário não é um cliente' });
    }

    const admExists = await Employee.findByOrFail('user_id', auth.user.id);

    if (admExists.type !== 'ADM') {
      return response.status(401).json({
        message: 'Você não tem autorização para efetuar essa ação',
      });
    }

    const client = await User.findOrFail(params.user_id);

    await client.delete();

    return response.status(204).json();
  }
}

module.exports = ClientController;
