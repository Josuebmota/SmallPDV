/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Stock = use('App/Models/Stock');

class StockController {
  async index({ response }) {
    const stock = await Stock.all();
    return response.status(200).json(stock);
  }

  async show({ params, response }) {
    const stock = await Stock.query()
      .with('products')
      .where('id', params)
      .fetch();

    return response.status(200).json(stock);
  }

  async update({ params, request, response }) {
    const stock = await Stock.findByOrFail('id', params);
    const data = request.all();
    stock.merge(data);

    return response.status(204);
  }
}

module.exports = StockController;
