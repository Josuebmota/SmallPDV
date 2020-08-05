class Reset {
  get rules() {
    return {
      token: 'required',
      password: 'required|confirmed',
    };
  }

  get messages() {
    return {
      'token.required': 'Token é obrigatório',
      'password.required': 'Password obrigatório',
      'password.confirmed': 'Password precisa ser confirmado',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages });
  }
}

module.exports = Reset;
