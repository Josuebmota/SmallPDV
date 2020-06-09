/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empregados = use('App/Models/Empregados');

class EmpregadosController {
  async store({ request, auth, response }) {
    await auth.check();
    if (auth.user.tipo !== 'ADM') {
      return response
        .status(401)
        .json('Você não tem autorização para cadastrar funcionários');
    }

    const { id, nome, email } = await Empregados.create(
      request.except(['password_confirmation'])
    );

    return response.status(201).json({ id, nome, email });
  }

  async index({ auth, response }) {
    await auth.check();
    if (auth.user.tipo !== 'ADM') {
      return response
        .status(401)
        .json('Você não tem autorização para lista funcionários');
    }

    const empregados = await Empregados.query()
      .select(
        'id',
        'nome',
        'cpf',
        'celular',
        'telefone',
        'cep',
        'logradouro',
        'numero',
        'bairro',
        'cidade',
        'estado',
        'tipo'
      )
      .where({ tipo: 'EMPREGADO' })
      .fetch();

    if (!empregados) {
      return 'Não há Empregados cadastrados';
    }

    return empregados;
  }

  async show({ params, auth, response }) {
    await auth.check();
    const empregado = await Empregados.query()
      .select(
        'id',
        'nome',
        'cpf',
        'celular',
        'telefone',
        'cep',
        'logradouro',
        'numero',
        'bairro',
        'cidade',
        'estado',
        'tipo'
      )
      .where({ id: params.id })
      .fetch();

    if (empregado.id === auth.user.id || auth.user.tipo === 'ADM') {
      return empregado;
    }

    return response.status(401).json({
      Unauthorized: 'Você não tem autorização para ver esse funcionario',
    });
  }

  async update({ params, request, response, auth }) {
    await auth.check();
    const empregado = await Empregados.findOrFail(params.id);

    if (empregado.id === auth.user.id || auth.user.tipo === 'ADM') {
      empregado.merge(request.except(['password_confirmation']));

      await empregado.save();

      return response.status(200).json({ update: 'Empregado Atualizado' });
    }
    return response
      .status(401)
      .json('Você não tem autorização para ver esse funcionario');
  }

  async destroy({ params, response, auth }) {
    await auth.check();

    if (auth.user.tipo !== 'ADM') {
      return response
        .status(401)
        .json('Você não tem autorização para remover esse empregado');
    }

    const empregado = await Empregados.findOrFail(params.id);

    await empregado.delete();

    return 'Empregado deletado';
  }
}

module.exports = EmpregadosController;
