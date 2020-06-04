/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Endereco = use('App/Models/Endereco');

class EnderecoController {
  async store({ request, auth, response }) {
    const newEndereco = await Endereco.create({
      user_id: auth.user.id,
      ...request.all(),
    });

    return response.status(201).json(newEndereco);
  }

  async index({ auth }) {
    const enderecos = await Endereco.all('user_id', auth.user_id);

    if (!enderecos) {
      return 'Não há Endereços cadastrados';
    }

    return enderecos;
  }

  async show({ params, auth, response }) {
    const enderecos = await Endereco.findOrFail(params.id);

    if (enderecos.user_id !== auth.user.id) {
      return response.status(401);
    }
    return enderecos;
  }

  async update({ params, request, auth, response }) {
    const enderecos = await Endereco.findOrFail(params.id);

    if (enderecos.user_id !== auth.user.id) {
      return response.status(401);
    }

    enderecos.merge(request.all());

    await enderecos.save();

    return response.status(201).json(enderecos);
  }

  async destroy({ params, response, auth }) {
    const enderecos = await Endereco.findOrFail(params.id);

    if (enderecos.user_id !== auth.user.id) {
      return response.status(401);
    }

    await enderecos.delete();

    return 'Endereço deletado';
  }
}

module.exports = EnderecoController;
