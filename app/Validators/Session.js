class Session {
  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

  get messages() {
    return {
      'email.required': 'E-mail is required',
      'email.email': 'Invalid e-mail',
      'password.required': 'Password is required',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Session;
