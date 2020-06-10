/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empregados = use('App/Models/Empregados');

class PerfilEmpregadoController {
  async index({ auth }) {
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
      .where({ id: auth.user.id })
      .fetch();
    return empregado;
  }
}

module.exports = PerfilEmpregadoController;
