/**
 * @swagger
 * stock:
 *  /api/stock:
 *   get:
 *     summary: Listando estoques de produtos.
 *     responses:
 *       200:
 *         description: Lista os estoques.
 *
 *  /api/stock/{id}:
 *   get:
 *     summary: Lista um estoque especifico
 *     responses:
 *       200:
 *         description: Lista todas as informações do produto.
 *       404:
 *         description: Estoque não encontrado.
 *
 *   put:
 *     summary: Atualizando estoque do produto
 *     parameters:
 *       - amount: 21
 *         description: Quantidade do produto
 *         type: integer
 *       - minimum_stock: 1
 *         description: Quantidade minima do produto
 *         type: integer
 *     responses:
 *       204:
 *         description: produto atualizado.
 *       400:
 *         description: Erro de validação de estoques
 */
