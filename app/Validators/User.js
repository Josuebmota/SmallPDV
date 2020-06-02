class User {
  get rules() {
    return {
      nome: 'required',
      email: 'required|email|unique:users',
    };
  }
}

module.exports = User;
