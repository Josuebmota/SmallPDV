class Reset {
  get rules() {
    return {
      token: 'required',
      password: 'required|confirmed',
    };
  }

  get messages() {
    return {
      'token.required': 'Token é obrigátorio',
      'password.required': 'Campo é obrigátorio',
      'password.confirmed': 'Password precisa ser confirmado',
    };
  }
}

module.exports = Reset;
