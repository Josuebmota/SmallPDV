/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telefone = use('App/Models/Telefone');

class TelefoneController {
  async store({ request, auth, response }) {
    const newTelefone = await Telefone.create({
      user_id: auth.user.id,
      ...request.all(),
    });

    return response.status(201).json(newTelefone);
  }

  async index({ auth }) {
    const telefones = await Telefone.all('user_id', auth.user_id);

    if (!telefones) {
      return 'Não há telefones cadastrados';
    }

    return telefones;
  }

  async show({ params, auth, response }) {
    const telefones = await Telefone.findOrFail(params.id);

    if (telefones.user_id !== auth.user.id) {
      return response.status(401);
    }
    return telefones;
  }

  async update({ params, request, auth, response }) {
    const telefones = await Telefone.findOrFail(params.id);

    if (telefones.user_id !== auth.user.id) {
      return response.status(401);
    }

    telefones.merge(request.all());

    await telefones.save();

    return response.status(201).json(telefones);
  }

  async destroy({ params, response, auth }) {
    const telefones = await Telefone.findOrFail(params.id);

    if (telefones.user_id !== auth.user.id) {
      return response.status(401);
    }

    await telefones.delete();

    return 'Telefone deletado';
  }
}

module.exports = TelefoneController;
