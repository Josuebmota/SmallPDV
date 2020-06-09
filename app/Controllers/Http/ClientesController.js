/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Clientes = use('App/Models/Clientes');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Endereco = use('App/Models/Endereco');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telefone = use('App/Models/Telefone');

class ClientesController {
  async store({ request, response }) {
    const cliente = await Clientes.create(
      request.only(['nome', 'email', 'cpf', 'saldo'])
    );

    const dataEndereco = request.only([
      'cep',
      'logradouro',
      'numero',
      'bairro',
      'cidade',
      'estado',
    ]);

    const dataTelefone = request.only(['celular', 'telefone']);

    if (Object.entries(dataEndereco).length !== 0) {
      await Endereco.create({
        cliente_id: cliente.id,
        ...dataEndereco,
      });
    }
    if (Object.entries(dataTelefone).length !== 0) {
      await Telefone.create({
        cliente_id: cliente.id,
        ...dataTelefone,
      });
    }

    return response
      .status(201)
      .json({ newClientes: { cliente, dataEndereco, dataTelefone } });
  }

  async index() {
    const cliente = await Clientes.query()
      .with('telefones')
      .with('enderecos')
      .fetch();

    if (!cliente) {
      return 'Não há clientes cadastrados';
    }

    delete cliente.cpf;

    return cliente;
  }

  async show({ params }) {
    const cliente = await Clientes.query()
      .where({ id: params.id })
      .with('telefones')
      .with('enderecos')
      .fetch();

    return cliente;
  }

  async update({ params, request, response }) {
    const cliente = await Clientes.findOrFail(params.id);

    cliente.merge(request.all());

    await cliente.save();

    return response.status(201).json(cliente);
  }

  async destroy({ params, response, auth }) {
    if (auth.user.tipo !== 'ADM') {
      return response.status(401).json('Você não tem autorização para excluir');
    }

    const cliente = await Clientes.findOrFail(params.id);

    await cliente.delete();

    return 'Cliente deletado';
  }
}

module.exports = ClientesController;
