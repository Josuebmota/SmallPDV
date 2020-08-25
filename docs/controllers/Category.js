/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Criação de usuários.
 *     parameters:
 *       - level: "0"
 *         description: Qual o level dessa categoria
 *         type: integer
 *       - name: "Enlatados"
 *         description: Nome da categoria
 *         type: string
 *       - child_count: 2
 *         description: quantas categorias derivadas
 *         type: integer
 *     responses:
 *       200:
 *         description: Lista das categorias.
 *       401:
 *         description: Sem autorização para cadastrar.
 *         example:
 *           message: 'Você não tem autorização para efetuar essa ação'
 *   get:
 *     summary: Listando categorias de produtos.
 *     responses:
 *       200:
 *         description: Lista das categorias.
 *
 * /api/category/{id}:
 *   get:
 *     summary: Lista uma categoria especifica
 *     responses:
 *       200:
 *         description: Lista as informações da Categoria.
 *       404:
 *         description: Categoria não encontrado.
 */
