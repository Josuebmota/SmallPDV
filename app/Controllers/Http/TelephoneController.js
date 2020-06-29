/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telephone = use('App/Models/Telephone');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class TelephoneController {
  async store({ request, response, params, auth }) {
    await auth.check();

    const useExists = await User.findByOrFail('id', params.id);

    if (!useExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const newTelephone = await Telephone.create({
      user_id: params.id,
      ...request.all(),
    });

    return response.status(201).json(newTelephone);
  }

  async index({ params, response, auth }) {
    await auth.check();

    const useExists = await User.findByOrFail('id', params.id);

    if (!useExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const telephone = await Telephone.query()
      .where('user_id', params.id)
      .fetch();

    if (!telephone) {
      return response.status(404).json('No telephones');
    }

    return telephone;
  }

  async show({ params, response, auth }) {
    await auth.check();

    const useExists = await User.findByOrFail('id', params.id);

    if (!useExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const telephone = await Telephone.findByOrFail('id', params.telephone_id);

    if (!telephone) {
      return response.status(404).json({ erro: 'This phone does not exist' });
    }

    if (telephone.user_id !== useExists.id) {
      return response
        .status(404)
        .json({ erro: 'This address does not belong to this user' });
    }

    return telephone;
  }

  async update({ params, request, response, auth }) {
    await auth.check();

    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const phone = await Telephone.findByOrFail('id', params.telephone_id);

    if (!phone) {
      return response.status(404).json({ erro: 'This phone does not exist' });
    }

    if (phone.user_id !== userExists.id) {
      return response
        .status(404)
        .json({ erro: 'This phone does not belong to this user' });
    }

    phone.merge(request.all());

    await phone.save();

    return response.status(201).json(phone);
  }

  async destroy({ params, response, auth }) {
    await auth.check();

    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    const telephone = await Telephone.findByOrFail('id', params.telephone_id);

    if (!telephone) {
      return response.status(404).json({ erro: 'This phone does not exist' });
    }

    if (telephone.user_id !== userExists.id) {
      return response
        .status(404)
        .json({ erro: 'This phone does not belong to this user' });
    }

    await telephone.delete();

    return response.status(200).json({ deleted: 'Deleted phone' });
  }
}

module.exports = TelephoneController;
