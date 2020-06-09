/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telefone = use('App/Models/Telefone');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Clientes = use('App/Models/Clientes');

class TelefoneController {
  async store({ request, response, params }) {
    const clienteExists = await Clientes.findByOrFail('id', params.id);

    if (!clienteExists) {
      return response
        .status(404)
        .json({ erro: 'Não foi encontrado esse cliente' });
    }

    const newTelefone = await Telefone.create({
      cliente_id: params.id,
      ...request.all(),
    });

    return response.status(201).json(newTelefone);
  }

  async index({ params, response }) {
    const clienteExists = await Clientes.findByOrFail('id', params.id);

    if (!clienteExists) {
      return response
        .status(404)
        .json({ erro: 'Não foi encontrado esse cliente' });
    }

    const telefone = await Telefone.query()
      .where('cliente_id', params.id)
      .fetch();

    if (!telefone) {
      return response.status(404).json('Não há endereços');
    }

    return telefone;
  }

  async show({ params, response }) {
    const clienteExists = await Clientes.findByOrFail('id', params.id);

    if (!clienteExists) {
      return response
        .status(404)
        .json({ erro: 'Não foi encontrado esse cliente' });
    }

    const telefone = await Telefone.findByOrFail('id', params.telefone_id);

    if (!telefone) {
      return response.status(404).json({ erro: 'Esse endereço não existe' });
    }

    if (telefone.cliente_id !== clienteExists.id) {
      return response
        .status(404)
        .json({ erro: 'Esse endereço não pertence a esse user' });
    }

    return telefone;
  }

  async update({ params, request, response }) {
    const clienteExists = await Clientes.findByOrFail('id', params.id);

    if (!clienteExists) {
      return response
        .status(404)
        .json({ erro: 'Não foi encontrado esse cliente' });
    }

    const telefone = await Telefone.findByOrFail('id', params.telefone_id);

    if (!telefone) {
      return response.status(404).json({ erro: 'Esse endereço não existe' });
    }

    if (telefone.cliente_id !== clienteExists.id) {
      return response
        .status(404)
        .json({ erro: 'Esse endereço não pertence a esse user' });
    }

    telefone.merge(request.all());

    await telefone.save();

    return response.status(201).json(telefone);
  }

  async destroy({ params, response, auth }) {
    const clienteExists = await Clientes.findByOrFail('id', params.id);

    if (!clienteExists) {
      return response
        .status(404)
        .json({ erro: 'Não foi encontrado esse cliente' });
    }

    if (auth.user.tipo !== 'ADM') {
      return response
        .status(401)
        .json('Você não tem autorização para alterar esse endereço');
    }

    const telefone = await Telefone.findByOrFail('id', params.telefone_id);

    if (!telefone) {
      return response.status(404).json({ erro: 'Esse endereço não existe' });
    }

    if (telefone.cliente_id !== clienteExists.id) {
      return response
        .status(404)
        .json({ erro: 'Esse endereço não pertence a esse user' });
    }

    await telefone.delete();

    return 'Endereço deletado';
  }
}

module.exports = TelefoneController;
