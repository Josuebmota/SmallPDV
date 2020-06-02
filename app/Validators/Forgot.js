class Forgot {
  get rules() {
    return {
      email: 'required|email',
    };
  }
}

module.exports = Forgot;
