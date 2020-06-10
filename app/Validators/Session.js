class Session {
  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

  get messages() {
    return {
      'email.required': 'E-mail é obrigátorio',
      'email.email': 'Forneça um e-mail valido',
      'password.required': 'Campo é obrigátorio',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Session;
