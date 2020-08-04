class Forgot {
  get rules() {
    return {
      email: 'required|email',
    };
  }

  get messages() {
    return {
      'email.required': 'E-mail is required',
      'email.email': 'Invalid e-mail',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages });
  }
}

module.exports = Forgot;
