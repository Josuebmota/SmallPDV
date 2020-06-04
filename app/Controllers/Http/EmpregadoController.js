/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empregados = use('App/Models/Empregados');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Endereco = use('App/Models/Endereco');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telefone = use('App/Models/Telefone');

class EmpregadoController {
  async store({ request, auth, response }) {
    const empregadoBoss = await Empregados.findByOrFail(auth.user.id);

    if (empregadoBoss.tipo !== 'ADM') {
      return response
        .status(401)
        .json('Você não tem autorização para cadastrar funcionários');
    }

    const empregados = await Empregados.create(
      request.only(['nome', 'email', 'cpf', 'password'])
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

    await empregados.enderecos().save(endereco);
    await empregados.telefones().save(telefone);

    return response
      .status(201)
      .json({ newUser: { empregados, endereco, telefone } });
  }

  async index({ auth, response }) {
    const empregadoBoss = await Empregados.findOrFail('user_id', auth.user_id);

    if (empregadoBoss.tipo !== 'ADM') {
      return response
        .status(401)
        .json('Você não tem autorização para cadastrar funcionários');
    }

    const empregados = await Empregados.all();

    if (!empregados) {
      return 'Não há Empregados cadastrados';
    }

    delete empregados.cpf;

    return empregados;
  }

  async update({ params, request, response }) {
    const enderecos = await Empregados.findOrFail(params.id);

    enderecos.merge(request.all());

    await enderecos.save();

    return response.status(201).json(enderecos);
  }

  async destroy({ params, response, auth }) {
    const empregadoBoss = await Empregados.findOrFail('user_id', auth.user_id);

    if (empregadoBoss.tipo !== 'ADM') {
      return response.status(401).json('Você não tem autorizado');
    }

    const empregado = await Empregados.findOrFail(params.id);

    await empregado.delete();

    return 'Endereço deletado';
  }
}

module.exports = EmpregadoController;
