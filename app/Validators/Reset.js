class Reset {
  get rules() {
    return {
      token: 'required',
      password: 'required|confirmed',
    };
  }

  get messages() {
    return {
      'token.required': 'Token is required',
      'password.required': 'Campo is required',
      'password.confirmed': 'Password needs to be confirmed',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Reset;
