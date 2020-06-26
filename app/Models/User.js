/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @method employees
   *
   * @method clients
   *
   * @method addresses
   *
   * @method telephones
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }

  employees() {
    return this.belongsTo('App/Models/Employee');
  }

  clients() {
    return this.belongsTo('App/Models/Client');
  }

  addresses() {
    return this.hasMany('App/Models/Address');
  }

  telephones() {
    return this.hasMany('App/Models/Telephone');
  }
}

module.exports = User;
