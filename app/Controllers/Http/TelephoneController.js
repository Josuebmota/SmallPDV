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
      cliente_id: params.id,
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

    if (Telephone.user_id !== useExists.id) {
      return response
        .status(404)
        .json({ erro: 'This address does not belong to this user' });
    }

    return Telephone;
  }

  async update({ params, request, response, auth }) {
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

    Telephone.merge(request.all());

    await Telephone.save();

    return response.status(201).json(Telephone);
  }

  async destroy({ params, response, auth }) {
    await auth.check();

    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ erro: 'User is not found' });
    }

    if (auth.user.type === 'ADM' || userExists.id === auth.user.user_id) {
      const telephone = await Telephone.findByOrFail('id', params.telefone_id);

      if (!telephone) {
        return response.status(404).json({ erro: 'This phone does not exist' });
      }

      if (telephone.user_id !== userExists.id) {
        return response
          .status(404)
          .json({ erro: 'This address does not belong to this user' });
      }

      await telephone.delete();

      return 'Phone deleted';
    }
    return response
      .status(401)
      .json('You are not authorized to change this phone');
  }
}

module.exports = TelephoneController;
