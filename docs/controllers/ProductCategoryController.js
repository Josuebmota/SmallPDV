/**
 * @swagger
 * productCategory:
 *  /api/productcategory/{product_id}:
 *   post:
 *     summary: cadatro de categorias ao produto.
 *     queryparams:
 *       - categories: 8
 *         description: Categorias
 *         type: string
 *     responses:
 *       200:
 *         description: Categorias cadastradas.
 *       400:
 *         description: Alguns desses items já foram cadastrados.
 *   delete:
 *     summary: Deletando categorias do produto.
 *     queryparams:
 *       - categories: 8
 *         description: Categorias
 *         type: string
 *     responses:
 *       204:
 *         description: categoria delatada.
 *       401:
 *         description: Você não tem autorização para deletar
 *
 */
