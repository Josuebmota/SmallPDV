const { rule } = use('Validator');

class UserUpdate {
  get rules() {
    const userId = this.ctx.params.user_id;

    return {
      email: `unique:users,email,id,${userId}`,
      cpf: [
        `unique:users,cpf,id,${userId}`,
        rule('unique', 'users'),
        rule('regex', /^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
      ],
      password: 'confirmed',
    };
  }

  get messages() {
    return {
      'email.email': 'Invalid e-mail',
      'email.unique': 'Existing e-mail',
      'cpf.unique': 'Existing cpf',
      'cpf.regex': 'Invalid cpf, xxx.xxx.xxx-xx',
      'password.confirmed': 'Password needs to be confirmed',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages });
  }
}

module.exports = UserUpdate;
