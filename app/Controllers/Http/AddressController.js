/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Address = use('App/Models/Address');

const Database = use('Database');

class AddressController {
  constructor() {
    this.notFoundMessages = {
      user: { message: 'Usuário não encontrado' },
      address: { message: 'Endereço não encontrado'}
    }
  }

  async store({ request, response, params, auth }) {
    await auth.check();
    const user = await User.find(params.user_id);

    if (! user) {
      return response.status(404).json(this.notFoundMessages[user]);
    }

    const { cep, street, number } = request.only(['cep', 'street', 'number']);

    const addressExists = await Database.select('cep', 'street', 'number')
      .from('addresses')
      .where({
        user_id: params.user_id,
        cep,
        street,
        number,
      })
      .first();

    if (addressExists) {
      return response
        .status(400)
        .json({ message: 'Você já registrou este endereço' });
    }

    const newAddress = await Address.create({
      user_id: params.user_id,
      ...request.all(),
    });

    return response.status(201).json(newAddress);
  }

  async index({ params, response, auth }) {
    await auth.check();
    const user = await User.find(params.user_id);

    if (! user) {
      return response.status(404).json(this.notFoundMessages[user]);
    }

    const addresses = await user.addresses().fetch();

    if (! addresses) {
      return response
        .status(200)
        .json({ message: 'Não existe endereços para esse usuário' });
    }

    return addresses;
  }

  async show({ params, response, auth }) {
    await auth.check();
    const user = await User.find(params.user_id);
    const address = user && await user.addresses()
      .where('id', params.address_id)
      .first();

    const models = { user, address };
    for (let modelName in models) {
      if (! models[modelName]) {
        return response.status(404).json(this.notFoundMessages[modelName]);
      }
    }

    return address;
  }

  async update({ params, request, response, auth }) {
    await auth.check();
    const user = await User.find(params.user_id);
    const address = user && await user.addresses()
      .where('id', params.address_id)
      .first();

    const models = { user, address };
    for (let modelName in models) {
      if (! models[modelName]) {
        return response.status(404).json(this.notFoundMessages[modelName]);
      }
    }

    address.merge(request.all());
    await address.save();
    return response.status(204).json();
  }

  async destroy({ params, response, auth }) {
    await auth.check();
    const user = await User.find(params.user_id);
    const address = user && await user.addresses()
      .where('id', params.address_id)
      .first();

    const models = { user, address };
    for (let modelName in models) {
      if (! models[modelName]) {
        return response.status(404).json(this.notFoundMessages[modelName]);
      }
    }

    await address.delete();

    return response.status(204).json();
  }
}

module.exports = AddressController;
