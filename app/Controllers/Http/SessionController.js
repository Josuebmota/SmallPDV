class SessionController {
  async login({ auth, request }) {
    const { email, password } = request.all();
    const { token } = await auth.attempt(email, password);

    return { token };
  }
}

module.exports = SessionController;
