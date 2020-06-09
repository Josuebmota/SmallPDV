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

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Forgot;
