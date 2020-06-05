/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Endereco = use('App/Models/Endereco');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telefone = use('App/Models/Telefone');

class ClientesController {
  async store({ request, response }) {
    const cliente = await User.create(request.only(['nome', 'email', 'cpf']), {
      tipo: 'cliente',
    });
    const endereco = await Endereco.create(
      request.only([
        'cep',
        'logradouro',
        'numero',
        'bairro',
        'cidade',
        'estado',
      ])
    );
    const telefone = await Telefone.create(
      request.only(['celular', 'telefone'])
    );

    await cliente.enderecos().save(endereco);
    await cliente.telefones().save(telefone);

    return response
      .status(201)
      .json({ newUser: { cliente, endereco, telefone } });
  }

  async index() {
    const cliente = await User.findByOrFail('tipo', 'cliente');

    if (!cliente) {
      return 'Não há clientes cadastrados';
    }

    delete cliente.cpf;

    return cliente;
  }

  async show({ params, response }) {
    const cliente = await User.findOrFail(params.id);

    if (cliente.tipo !== 'cliente') {
      return response.status(400).json('Esse user não é um cliente');
    }

    return cliente;
  }

  async update({ params, request, response }) {
    const cliente = await User.findOrFail(params.id);

    if (cliente.tipo !== 'cliente') {
      return response.status(400).json('Esse user não é um cliente');
    }

    cliente.merge(request.all());

    await cliente.save();

    return response.status(201).json(cliente);
  }

  async destroy({ params, response, auth }) {
    const empregadoBoss = await User.findOrFail('user_id', auth.user_id);

    if (empregadoBoss.tipo !== 'ADM') {
      return response.status(401).json('Você não tem autorização');
    }

    const cliente = await User.findOrFail(params.id);

    if (cliente.tipo !== 'cliente') {
      return response.status(400).json('Esse user não é um cliente');
    }

    await cliente.delete();

    return 'Cliente deletado';
  }
}

module.exports = ClientesController;
