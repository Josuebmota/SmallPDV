const { rule } = use('Validator');

class Category {
  get rules() {
    return {
    };
  }

  get messages() {
    return {
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Cliente;
