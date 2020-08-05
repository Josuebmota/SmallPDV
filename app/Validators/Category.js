class Category {
  get rules() {
    return {
      name: 'required|unique:categories',
    };
  }

  get messages() {
    return {
      'name.required': 'Nome da categoria é obrigatoria',
      'name.unique': 'Nome da categoria é único',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages });
  }
}

module.exports = Category;
