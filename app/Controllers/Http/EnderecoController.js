/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Endereco = use('App/Models/Endereco');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Clientes = use('App/Models/Clientes');

const Database = use('Database');

class EnderecoController {
  async store({ request, response, params }) {
    const clienteExists = await Clientes.findByOrFail('id', params.id);

    if (!clienteExists) {
      return response
        .status(404)
        .json({ erro: 'Não foi encontrado esse cliente' });
    }

    const { cep, logradouro, numero } = request.only([
      'cep',
      'logradouro',
      'numero',
    ]);

    const enderecoExists = await Database.select('cep', 'logradouro', 'numero')
      .from('enderecos')
      .where({
        cliente_id: params.id,
        cep,
        logradouro,
        numero,
      });

    if (enderecoExists) {
      return response
        .status(400)
        .json({ erro: 'Você já cadastrou esse endereço' });
    }
    const newEndereco = await Endereco.create({
      cliente_id: params.id,
      ...request.all(),
    });

    return response.status(201).json(newEndereco);
  }

  async index({ params, response, auth }) {
    const clienteExists = await Clientes.findByOrFail('id', auth.user.id);

    if (!clienteExists) {
      return response
        .status(404)
        .json({ erro: 'Não foi encontrado esse cliente' });
    }

    const enderecos = await Endereco.query()
      .where('cliente_id', params.id)
      .fetch();

    if (!enderecos) {
      return response.status(404).json('Não há endereços');
    }

    return enderecos;
  }

  async show({ params, response }) {
    const clienteExists = await Clientes.findByOrFail('id', params.id);

    if (!clienteExists) {
      return response
        .status(404)
        .json({ erro: 'Não foi encontrado esse cliente' });
    }

    const enderecos = await Endereco.findByOrFail('id', params.endereco_id);

    if (!enderecos) {
      return response.status(404).json({ erro: 'Esse endereço não existe' });
    }

    if (enderecos.cliente_id !== clienteExists.id) {
      return response
        .status(404)
        .json({ erro: 'Esse endereço não pertence a esse user' });
    }

    return enderecos;
  }

  async update({ params, request, response }) {
    const clienteExists = await Clientes.findByOrFail('id', params.id);

    if (!clienteExists) {
      return response
        .status(404)
        .json({ erro: 'Não foi encontrado esse cliente' });
    }

    const enderecos = await Endereco.findByOrFail('id', params.endereco_id);

    if (!enderecos) {
      return response.status(404).json({ erro: 'Esse endereço não existe' });
    }

    if (enderecos.cliente_id !== clienteExists.id) {
      return response
        .status(404)
        .json({ erro: 'Esse endereço não pertence a esse user' });
    }

    enderecos.merge(request.all());

    await enderecos.save();

    return response.status(201).json(enderecos);
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

    const enderecos = await Endereco.findByOrFail('id', params.endereco_id);

    if (!enderecos) {
      return response.status(404).json({ erro: 'Esse endereço não existe' });
    }

    if (enderecos.cliente_id !== clienteExists.id) {
      return response
        .status(404)
        .json({ erro: 'Esse endereço não pertence a esse user' });
    }

    await enderecos.delete();

    return 'Endereço deletado';
  }
}

module.exports = EnderecoController;
