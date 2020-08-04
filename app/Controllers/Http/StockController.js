/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Stock = use('App/Models/Stock');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const StockAction = use('App/Models/StockAction');

class StockController {
  async index({ response, auth }) {
    await auth.check();

    const stock = await Stock.all();
    return response.status(200).json(stock);
  }

  async show({ params, response, auth }) {
    await auth.check();

    const stock = await Stock.query()
      .with('products')
      .where('product_id', params.id)
      .fetch();

    if (stock.toJSON().length === 0) {
      return response.status(404).json({ message: 'Ordem não foi encontrada' });
    }

    return response.status(200).json(stock);
  }

  async update({ auth, params, request, response }) {
    await auth.check();

    const stock = await Stock.findByOrFail('id', params.id);
    const dataStock = request.only(['amount', 'minimum_stock']);

    let type = 'DECREMENT';
    let stockActionAmount = stock.amount - dataStock.amount;

    if (stockActionAmount < 0) {
      type = 'INCREMENT';
      stockActionAmount *= -1;
    } else if (stockActionAmount === 0 && stock.amount === 0) {
      type = 'NOT CHANGE';
    }

    StockAction.create({
      type,
      stock_id: stock.id,
      amount: stockActionAmount,
    });

    stock.merge(dataStock);
    await stock.save();
    return response.status(204).json();
  }
}

module.exports = StockController;
