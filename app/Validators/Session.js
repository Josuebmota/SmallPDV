class Session {
  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }
}

module.exports = Session;
