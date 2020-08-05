class Product {
  get rules() {
    return {
      name: 'required',
      bar_code: 'required_without_any:internal_code|unique:products',
      internal_code: 'required_without_any:bar_code|unique:products',
      cost_price: 'required',
      sell_price: 'required',
      to_sell: 'required',
      show_online: 'required',
      fraction_sell: 'required',
      amount: 'required',
      minimum_stock: 'required',
    };
  }

  get messages() {
    return {
      'name.required': 'Nome do produto é obrigatório.',
      'bar_code.required_without_any':
        'Você precisa inserir um código de barras ou código interno.',
      'bar_code.unique': 'Código de barra é único.',
      'internal_code.required_without_any':
        'Você precisa inserir um código de barras ou código interno.',
      'internal_code.unique': 'Código interno é único.',
      'cost_price.required': 'Preço do custo é obrigatório.',
      'sell_price.required': 'Preço da venda é obrigatório.',
      'to_sell.required': 'Campo venda é obrigatório.',
      'show_online.required': 'Mostrar online é obrigatório.',
      'fraction_sell.required': 'Venda de fração é obrigatório.',
      'amount.required': 'Quantidade do produto é obrigatório.',
      'minimum_stock.required': 'Estoque minimo do produto é obrigatório.',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages });
  }
}

module.exports = Product;
