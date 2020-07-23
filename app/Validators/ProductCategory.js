class ProductCategory {
  get rules() {
    return {
      id_product: 'required',
      id_category: 'required',
    };
  }

  get messages() {
    return {
      'id_product.required': 'O id do produto é obrigatório',
      'id_category.required': 'O id da categoria é obrigatório',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = ProductCategory;
