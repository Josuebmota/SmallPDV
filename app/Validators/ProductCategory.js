const { rule } = use('Validator');

class ProductCategory {
  get rules() {
    return {
      id_product:'required',
      id_category:'required',
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
