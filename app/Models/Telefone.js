/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Telefone extends Model {
  empregado() {
    return this.belongsTo('App/Models/User');
  }

  cliente() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Telefone;
