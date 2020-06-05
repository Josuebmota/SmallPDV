/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Telefone extends Model {
  user() {
    return this.belongsTo('App/Models/Cliente');
  }
}

module.exports = Telefone;
