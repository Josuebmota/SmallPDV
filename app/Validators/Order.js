class Order {
  get rules() {
    return {
      total: 'required|min:0',
      'products.*.product_id': 'required',
      'products.*.amount': 'required',
    };
  }

  get messages() {
    return {
      'total.required': 'Total é necessário.',
      'total.min': 'Total deve ser no mínimo zero',
      'products.*.product_id.required': 'Atribua o id no produto.',
      'products.*.amount.required': 'Atribua uma quantidade ao produto.',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages });
  }
}

module.exports = Order;
