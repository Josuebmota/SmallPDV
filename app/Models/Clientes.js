/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Clientes extends Model {
  enderecos() {
    return this.hasMany('App/Models/Endereco');
  }

  telefones() {
    return this.hasMany('App/Models/Telefone');
  }
}

module.exports = Clientes;
