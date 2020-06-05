/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Administrador = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Endereco = use('App/Models/Endereco');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telefone = use('App/Models/Telefone');

class AdmController {
  async store({ request, response }) {
    const user = await Administrador.create(
      request.only(['nome', 'email', 'cpf', 'tipo', 'password'])
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

    await user.enderecos().save(endereco);
    await user.telefones().save(telefone);

    return response.status(201).json({ newUser: { user, endereco, telefone } });
  }
}

module.exports = AdmController;
