/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Order = use('App/Models/Order');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Stock = use('App/Models/Stock');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const StockAction = use('App/Models/StockAction');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const OrderProduct = use('App/Models/OrderProduct');

const Database = use('Database');

class OrderController {
  async store({ request, response }) {
    const trx = await Database.beginTransaction();

    const dataOrder = request.only(['client_id', 'status', 'itsPaid', 'total']);
    const dataOrderProduct = await request.only(['amount', 'product_id']);
    const { products } = await request.only(['products']);
    const { insist } = await request.only(['insist']);

    const newOrder = await Order.create(dataOrder, trx);

    dataOrderProduct.order_id = newOrder.id;

    await OrderProduct.create(dataOrderProduct, trx);

    products.map((product) => {
      const stock = Stock.findByOrFail('product_id', product.product_id);
      if (!stock) {
        return response
          .status(404)
          .send({ message: 'Não foi encontrado estoque para esse produto' });
      }

      const newAmount = stock.amount - dataOrderProduct.amount;

      if (newAmount <= stock.minimum_stock) {
        if (insist !== true) {
          return response.status(200).json({
            message: 'Infelizmente o produto chegou no limite estabelecido',
            newAmount,
          });
        }
        if (newAmount <= 0) {
          return response.status(200).json({
            message: 'Acabou o estoque',
          });
        }
      }

      StockAction.create(
        {
          type: 'INCREMENT',
          stock_id: stock.id,
          amount: dataOrderProduct.amount,
        },
        trx
      );

      stock.merge({ amount: newAmount }, trx);
      trx.commit();
      return response.status(201).json({ newOrder, dataOrderProduct });
    });
  }

  async index({ response }) {
    const orders = await Order.query().with('client').with('products').fetch();
    return response.status(200).json(orders);
  }

  async show({ response, params }) {
    const order = await Order.query()
      .with('client')
      .with('products')
      .where('id', params)
      .fetch();
    return response.status(200).json(order);
  }
}

module.exports = OrderController;
