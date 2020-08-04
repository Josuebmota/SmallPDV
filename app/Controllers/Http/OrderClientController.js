/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Order = use('App/Models/Order');

class OrderClientController {
  async index({ response, params }) {
    const orderClient = await Order.query()
      .with('products', (product) => {
        product.select('id', 'name', 'sell_price', 'image');
      })
      .where('client_id', params.client_id)
      .fetch();

    return response.status(200).json(orderClient);
  }

  async show({ response, params }) {
    const orderClient = await Order.query()
      .with('products', (product) => {
        product.select('id', 'name', 'sell_price', 'image');
      })
      .where('id', params.order_id)
      .where('client_id', params.client_id)
      .first();

    return response.status(200).json(orderClient);
  }
}

module.exports = OrderClientController;
