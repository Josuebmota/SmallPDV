/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Order = use('App/Models/Order');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Stock = use('App/Models/Stock');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const StockAction = use('App/Models/StockAction');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const OrderProduct = use('App/Models/OrderProduct');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');

const Database = use('Database');

async function updateAmountStock(id, amount) {
  await Stock.query().where('id', id).update({ amount });
  return this;
}

class OrderController {
  async store({ request, response, auth }) {
    await auth.check();

    const trx = await Database.beginTransaction();

    const { client_id, total, products, insist } = request.only([
      'client_id',
      'total',
      'products',
      'insist',
    ]);

    const onlyIdProdcts = products
      .sort((a, b) => {
        return a.product_id - b.product_id;
      })
      .map((prod) => {
        return prod.product_id;
      });

    const { totalPriceProducts } = await Product.query()
      .sum('sell_price as totalPriceProducts')
      .whereIn('id', onlyIdProdcts)
      .first();

    if (total < totalPriceProducts) {
      return response.status(400).json({
        message: 'Valor Insuficiente',
        total,
        totalPriceProducts,
      });
    }
    const stocks = await Stock.query()
      .select('id', 'amount', 'minimum_stock')
      .whereIn('product_id', onlyIdProdcts)
      .fetch();

    if (onlyIdProdcts.length !== stocks.toJSON().length) {
      return response.status(400).json({
        message: 'Alguns dos produtos selecionados não possui estoque',
        products,
        stocks,
      });
    }

    const newOrder = await Order.create(
      {
        cost: totalPriceProducts,
        payback: total - totalPriceProducts,
        total,
        client_id,
      },
      trx
    );

    const DataOrderProduct = products.map((prod) => {
      return {
        order_id: newOrder.id,
        product_id: prod.product_id,
      };
    });

    const erroStock = [];
    const DataStockAction = stocks.toJSON().map((stock, index) => {
      const newAmount = stock.amount - products[index].amount;
      if (newAmount <= stock.minimum_stock) {
        if (insist !== true) {
          erroStock.push({
            product: products[index],
            error: 'Infelizmente o estoque deste produto chegou ao limite',
            newAmount,
            stock,
          });
        } else if (newAmount < 0) {
          erroStock.push({
            product: products[index],
            error: 'Estoque deste produto esta vazio',
            newAmount,
            stock,
          });
        }
      }
      return {
        type: 'DECREMENT',
        stock_id: stock.id,
        amount: products[index].amount,
      };
    });

    if (erroStock.length !== 0) {
      return response.status(400).json({ message: erroStock });
    }

    for (let index = 0; index < DataStockAction.length; index += 1) {
      const newAmount = stocks.toJSON()[index].amount - products[index].amount;
      updateAmountStock(DataStockAction[index].stock_id, newAmount);
    }

    await OrderProduct.createMany(DataOrderProduct, trx);
    await StockAction.createMany(DataStockAction, trx);
    trx.commit();

    return response.status(201).json({ newOrder });
  }

  async index({ response, auth }) {
    await auth.check();

    const orders = await Order.query()
      .select('id', 'client_id', 'total', 'cost', 'payback')
      .with('products', (product) => {
        product.select('id', 'name', 'sell_price', 'image');
      })
      .fetch();
    return response.status(200).json(orders);
  }

  async show({ response, params, auth }) {
    await auth.check();

    const order = await Order.query()
      .with('clients')
      .with('products')
      .where('id', params.id)
      .fetch();

    if (order.toJSON().length === 0) {
      return response.status(404).json({ message: 'Ordem não foi encontrada' });
    }
    return response.status(200).json(order);
  }
}

module.exports = OrderController;
