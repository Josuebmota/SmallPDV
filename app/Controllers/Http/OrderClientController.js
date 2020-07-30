/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Order = use('App/Models/Order');

class OrderClientController {
  async show({ request, response }) {
    const client = request.get().id;
    const orderClient = await Order.findByOrFail('id', client);

    return response.status(200).json(orderClient);
  }
}

module.exports = OrderClientController;
