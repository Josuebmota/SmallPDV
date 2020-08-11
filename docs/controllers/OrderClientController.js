/**
 * @swagger
 * orderClient:
 *  /api/orderclient/{client_id}:
 *   get:
 *     summary: Listando ordens das compras do cliente.
 *     responses:
 *       200:
 *         description: Lista as ordens em conjunto dos produtos dela.
 *
 *  /api/orderclient/{client_id}/{order_id}:
 *   get:
 *     summary: Listando uma ordem especifica da compra de um cliente.
 *     responses:
 *       200:
 *         description: lista a ordem em conjunto dos produtos dela.
 *       404:
 *         description: Ordem não foi encontrada.
 *
 */
