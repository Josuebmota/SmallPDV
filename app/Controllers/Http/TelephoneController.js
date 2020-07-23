/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telephone = use('App/Models/Telephone');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class TelephoneController {
  async store({ request, response, params, auth }) {
    await auth.check();

    const useExists = await User.findByOrFail('id', params.id);

    if (!useExists) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
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
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const telephone = await Telephone.query()
      .where('user_id', params.id)
      .fetch();

    if (!telephone) {
      return response
        .status(200)
        .json({ message: 'Não existe telefones para esse usuário' });
    }

    return telephone;
  }

  async show({ params, response, auth }) {
    await auth.check();

    const useExists = await User.findByOrFail('id', params.id);

    if (!useExists) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const telephone = await Telephone.findByOrFail('id', params.telephone_id);

    if (!telephone) {
      return response.status(404).json({ message: 'Telefone não encontrado' });
    }

    if (telephone.user_id !== useExists.id) {
      return response
        .status(404)
        .json({ message: 'Esse telefone não pertece a esse usuário' });
    }

    return telephone;
  }

  async update({ params, request, response, auth }) {
    await auth.check();

    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const phone = await Telephone.findByOrFail('id', params.telephone_id);

    if (!phone) {
      return response.status(404).json({ message: 'Telefone não encontrado' });
    }

    if (phone.user_id !== userExists.id) {
      return response
        .status(404)
        .json({ message: 'Esse telefone não pertece a esse usuário' });
    }

    phone.merge(request.all());

    await phone.save();

    return response.status(201).json(phone);
  }

  async destroy({ params, response, auth }) {
    await auth.check();

    const userExists = await User.findByOrFail('id', params.id);

    if (!userExists) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    const telephone = await Telephone.findByOrFail('id', params.telephone_id);

    if (!telephone) {
      return response.status(404).json({ message: 'Telefone não encontrado' });
    }

    if (telephone.user_id !== userExists.id) {
      return response
        .status(404)
        .json({ message: 'Esse telefone não pertence a esse usuário' });
    }

    await telephone.delete();

    return response.status(200).json({ message: 'Phone deletado' });
  }
}

module.exports = TelephoneController;
