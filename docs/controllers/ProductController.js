/**
 * @swagger
 * product:
 *  /api/product:
 *   post:
 *     summary: Criação de produtos.
 *     parameters:
 *       - name: "Mushroom - Lg - Cello"
 *         description: Nome do produto
 *         required: true
 *         type: string
 *       - bar_code: "43403968967670144"
 *         description: Codigo de barra
 *         type: string
 *       - internal_code: "840670"
 *         description: codigo interno
 *         type: string
 *       - description: "at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat"
 *         type: string
 *       - cost_price: 45.7
 *         description: Preço de custo
 *         required: true
 *         type: decimal
 *       - sell_price:  46.62
 *         description: Preço de venda
 *         required: false
 *         type: decimal
 *       - to_sell: true
 *         description: venda
 *         required: true
 *         type: boolean
 *       - show_online: true,
 *         description: Flag para mostra o produto
 *         required: true
 *         type: boolean
 *       - fraction_sell: true
 *         description: venda de fração
 *         required: true
 *         type: boolean
 *       - categories: "1,8"
 *         description: Categorias do produto
 *         required: true
 *         type: string
 *       - amount: 21
 *         description: Quantidade do produto
 *         required: true
 *         type: integer
 *       - minimum_stock: 1
 *         description: Quantidade minima do produto
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: produto criado
 *       400:
 *         description: Quantidade menor que o estoque minino
 *
 *   get:
 *     summary: Listando produtos.
 *     responses:
 *       200:
 *         description: Lista dos produtos com algumas informações.
 *
 *  /api/product/{id}:
 *   get:
 *     summary: Lista produto
 *     responses:
 *       200:
 *         description: Lista todas as informações do produto.
 *       404:
 *         description: Produto não encontrado.
 * 
 *   put:
 *     summary: Atualizando produto
 *     parameters:
 *       - name: "Mushroom - Lg - Cello"
 *         description: Nome do produto
 *         required: true
 *         type: string
 *       - bar_code: "43403968967670144"
 *         description: Codigo de barra
 *         type: string
 *       - internal_code: "840670"
 *         description: codigo interno
 *         type: string
 *       - description: "at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat"
 *         type: string
 *       - cost_price: 45.7
 *         description: Preço de custo
 *         required: true
 *         type: decimal
 *       - sell_price:  46.62
 *         description: Preço de venda
 *         required: false
 *         type: decimal
 *       - to_sell: true
 *         description: venda
 *         required: true
 *         type: boolean
 *       - show_online: true,
 *         description: Flag para mostra o produto
 *         required: true
 *         type: boolean
 *       - fraction_sell: true
 *         description: venda de fração
 *         required: true
 *         type: boolean
 *     responses:
 *       204:
 *         description: produto atualizado.
 *       404:
 *         description: produto não encontrado

 *   delete:
 *     summary: Deletando produtos
 *     responses:
 *       204:
 *         description: produto deletado.
 *       401:
 *         description: Sem autorização para delatar.
 *         example:
 *           message: 'Você não tem autorização para efetuar essa ação'
 *       404:
 *         description: produto não encontrado
 */
