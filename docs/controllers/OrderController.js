/**
 * @swagger
 * order:
 *  /api/order:
 *   post:
 *     summary: cadatro de categorias ao produto.
 *     parameters:
 *       - client_id: 1
 *         description: id do cliente
 *         type: integer
 *       - total: 203.42
 *         description: total do produto
 *         type: decimal
 *       - products: {
 *                    "product_id":7,
 *                     "amount":2
 *                   }
 *         description: Produtos com id e produto
 *         type: integer
 *     responses:
 *       201:
 *         description: cadastro da ordem da compra de produtos.
 *       400:
 *         description: Erros variados no estoque.
 *   delete:
 *     summary: Deletando categorias do produto.
 *     responses:
 *       204:
 *         description: categoria delatada.
 *       401:
 *         description: Você não tem autorização para deletar
 *   get:
 *     summary: Listando ordens das compras.
 *     responses:
 *       200:
 *         description: Lista as ordens em conjunto dos produtos dela.
 *
 *  /api/order/{id}:
 *   get:
 *     summary: Listando ordem da compra.
 *     responses:
 *       200:
 *         description: lista a ordem em conjunto dos produtos dela.
 *       404:
 *         description: Ordem não foi encontrada.
 *
 */
