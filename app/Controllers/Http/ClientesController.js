/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empregados = use('App/Models/Empregados');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Clientes = use('App/Models/Clientes');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Endereco = use('App/Models/Endereco');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telefone = use('App/Models/Telefone');

class ClientesController {
  async store({ request, response }) {
    const cliente = await Clientes.create(
      request.only(['nome', 'email', 'cpf'])
    );
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

  async index({ auth, response }) {
    const empregadoBoss = await Empregados.findOrFail('user_id', auth.user_id);

    if (empregadoBoss.tipo !== 'ADM') {
      return response.status(401).json('Você não tem autorização');
    }

    const cliente = await Clientes.all();

    if (!cliente) {
      return 'Não há clientes cadastrados';
    }

    delete cliente.cpf;

    return cliente;
  }

  async update({ params, request, response }) {
    const cliente = await Clientes.findOrFail(params.id);

    cliente.merge(request.all());

    await cliente.save();

    return response.status(201).json(cliente);
  }

  async destroy({ params, response, auth }) {
    const empregadoBoss = await Empregados.findOrFail('user_id', auth.user_id);

    if (empregadoBoss.tipo !== 'ADM') {
      return response.status(401).json('Você não tem autorização');
    }

    const cliente = await Clientes.findOrFail(params.id);

    await cliente.delete();

    return 'Cliente deletado';
  }
}

module.exports = ClientesController;
