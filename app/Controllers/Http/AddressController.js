/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Address = use('App/Models/Address');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Database = use('Database');

class AddressController {
  async store({ request, response, params, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const { cep, street, number } = request.only(['cep', 'street', 'number']);

    const AddressExists = await Database.select('cep', 'street', 'number')
      .from('addresses')
      .where({
        user_id: params.id,
        cep,
        street,
        number,
      })
      .first();

    if (AddressExists) {
      return response
        .status(400)
        .json({ erro: 'You already registered this address' });
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
      return response.status(404).json({ erro: 'User is not found' });
    }

    const address = await Address.query().where('user_id', params.id).fetch();

    if (!address) {
      return response.status(404).json('Address is not found');
    }

    return address;
  }

  async show({ params, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const address = await Address.findByOrFail('id', params.address_id);

    if (!address) {
      return response.status(404).json({ erro: 'Address is not found' });
    }

    if (address.user_id !== userExists.id) {
      return response
        .status(404)
        .json({ erro: 'This address does not belong to this user' });
    }

    return address;
  }

  async update({ params, request, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const address = await Address.findByOrFail('id', params.address_id);

    if (!address) {
      return response.status(404).json({ erro: 'Address is not found' });
    }

    if (address.user_id !== userExists.id) {
      return response
        .status(404)
        .json({ erro: 'This address does not belong to this user' });
    }

    address.merge(request.all());
    await address.save();
    return response.status(201).json(address);
  }

  async destroy({ params, response, auth }) {
    await auth.check();
    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    if (auth.user.type === 'ADM' || userExists.id === auth.user.user_id) {
      const addresss = await Address.findByOrFail('id', params.address_id);

      if (!addresss) {
        return response.status(404).json({ erro: 'Address is not found' });
      }

      if (addresss.user_id !== userExists.id) {
        return response
          .status(404)
          .json({ erro: 'This address does not belong to this user' });
      }

      await addresss.delete();

      return 'Deleted address';
    }

    return response
      .status(401)
      .json('You are not authorized to change this address');
  }
}

module.exports = AddressController;
