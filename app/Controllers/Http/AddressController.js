/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Address = use('App/Models/Address');

const Database = use('Database');

class AddressController {
  async store({ request, response, params, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ message: 'User is not found' });
    }

    const { cep, street, number } = request.only(['cep', 'street', 'number']);

    const addressExists = await Database.select('cep', 'street', 'number')
      .from('addresses')
      .where({
        user_id: params.id,
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
      user_id: params.id,
      ...request.all(),
    });

    return response.status(201).json(newAddress);
  }

  async index({ params, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const address = await Address.query().where('user_id', params.id).fetch();

    if (!address) {
      return response
        .status(200)
        .json({ message: 'Não existe endereços para esse usuário' });
    }

    return address;
  }

  async show({ params, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const address = await Address.findByOrFail('id', params.address_id);

    if (!address) {
      return response.status(404).json({ message: 'Endereço não encontrado' });
    }

    if (address.user_id !== userExists.id) {
      return response
        .status(400)
        .json({ messager: 'Esse endereço não pertence a este usuário' });
    }

    return address;
  }

  async update({ params, request, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const address = await Address.findByOrFail('id', params.address_id);

    if (!address) {
      return response.status(404).json({ message: 'Endereço não encontrado' });
    }

    if (address.user_id !== userExists.id) {
      return response
        .status(400)
        .json({ message: 'Esse endereço não pertence a este usuário' });
    }

    const { cep, street, number } = request.only(['cep', 'street', 'number']);

    const addressExists = await Database.select('cep', 'street', 'number')
      .from('addresses')
      .where({
        user_id: params.id,
        cep,
        street,
        number,
      })
      .first();

    if (addressExists) {
      return response
        .status(400)
        .json({ message: 'Você já registrou esse endereço' });
    }

    address.merge(request.all());
    await address.save();
    return response.status(204).json();
  }

  async destroy({ params, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const addresss = await Address.findByOrFail('id', params.address_id);

    if (!addresss) {
      return response.status(404).json({ message: 'Endereço não encontrado' });
    }

    if (addresss.user_id !== userExists.id) {
      return response
        .status(400)
        .json({ message: 'Esse endereço não pertence a este usuário' });
    }

    await addresss.delete();

    return response.status(204).json();
  }
}

module.exports = AddressController;
