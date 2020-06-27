class ProductSerializer {
  constructor(
    id,
    name,
    bar_code = null,
    internal_code = null,
    description = null,
    cost_price,
    sell_price,
    to_sell = false,
    show_online = false,
    unity = null,
    fraction_sell = false,
    stock_control = false
  ) {
    this.id = id;
    this.name = name;
    this.bar_code = bar_code;
    this.internal_code = internal_code;
    this.description = description;
    this.cost_price = cost_price;
    this.sell_price = sell_price;
    this.to_sell = to_sell;
    this.show_online = show_online;
    this.unity = unity;
    this.fraction_sell = fraction_sell;
    this.stock_control = stock_control;
  }

  first() {
    return this.rows[0];
  }

  last() {
    return this.rows[this.rows.length - 1];
  }

  size() {
    return this.isOne ? 1 : this.rows.length;
  }

  toJSON() {
    return {
      "id": this.id,
      "name": this.name,
      "bar_code": this.bar_code,
      "internal_code": this.internal_code,
      "description": this.description,
      "cost_price": parseFloat(this.cost_price).toFixed(2),
      "sell_price": parseFloat(this.sell_price).toFixed(2),
      "to_sell": this.to_sell,
      "show_online": this.show_oline,
      "unity": this.unity,
      "fraction_sell": this.fraction_sell,
      "stock_control": this.stock_control,
    };
    // return formatted data
  }
}

module.exports = ProductSerializer;
