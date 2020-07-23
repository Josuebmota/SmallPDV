class Category {
  get rules() {
    return {
      label: 'required|unique:categories',
    };
  }

  get messages() {
    return {
      'label.required': 'Nome da categoria é obrigatoria',
      'label.unique': 'Node da categoria é único',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Category;
