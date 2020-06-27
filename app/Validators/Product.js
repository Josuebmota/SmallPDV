const { rule } = use('Validator');

class Product {
  get rules() {
    return {
      name :'required' ,
      bar_code : 'required_without_any:internal_code',
      internal_code : 'required_without_any:bar_code' ,
      cost_price : 'required',
      sell_price :'required' ,
    };
  }

  get messages() {
    return {
      "bar_code.required_without_any": "Você precisa inserir um código de barras ou código interno.",
      "internal_code.required_without_any": "Você precisa inserir um código de barras ou código interno."
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Product;
