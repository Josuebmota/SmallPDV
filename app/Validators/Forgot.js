class Forgot {
  get rules() {
    return {
      email: 'required|email',
    };
  }

  get messages() {
    return {
      'email.required': 'E-mail é obrigátorio',
      'email.email': 'Forneça um e-mail valido',
    };
  }
}

module.exports = Forgot;
