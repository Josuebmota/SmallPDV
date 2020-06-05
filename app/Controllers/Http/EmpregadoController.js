/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Endereco = use('App/Models/Endereco');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telefone = use('App/Models/Telefone');

class EmpregadoController {
  async store({ request, auth, response }) {
    const empregadoBoss = await User.findByOrFail(auth.user.id);

    if (empregadoBoss.tipo !== 'ADM') {
      return response
        .status(401)
        .json('Você não tem autorização para cadastrar funcionários');
    }

    const empregados = await User.create(
      request.only(['nome', 'email', 'cpf', 'password'], {
        tipo: 'empregado',
      })
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
    const empregadoBoss = await User.findOrFail('user_id', auth.user_id);

    if (empregadoBoss.tipo !== 'ADM') {
      return response
        .status(401)
        .json('Você não tem autorização para lista funcionários');
    }

    const empregados = await User.findOrFail('tipo', 'empregado');

    if (!empregados) {
      return 'Não há Empregados cadastrados';
    }

    delete empregados.cpf;

    return empregados;
  }

  async update({ params, request, response }) {
    const empregado = await User.findOrFail(params.id);

    if (empregado.tipo !== 'empregado') {
      return response.status(400).json('Esse user não é um empregado');
    }

    empregado.merge(request.all());

    await empregado.save();

    return response.status(201).json(empregado);
  }

  async destroy({ params, response, auth }) {
    const empregadoBoss = await User.findOrFail('user_id', auth.user_id);

    if (empregadoBoss.tipo !== 'ADM') {
      return response.status(401).json('Você não tem autorizado');
    }

    const empregado = await User.findOrFail(params.id);

    if (empregado.tipo !== 'empregado') {
      return response.status(400).json('Esse user não é um emprego');
    }

    await empregado.delete();

    return 'Endereço deletado';
  }
}

module.exports = EmpregadoController;
