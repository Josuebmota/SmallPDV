/**
 * @swagger
 * telephone:
 *  /api/telephone/{user_id}:
 *   post:
 *     summary: Criação de usuários.
 *     parameters:
 *       - cellphone: "(85)94222-0997"
 *         description: Celular do usuário
 *         format: (XX)9XXXX-XXXX
 *         type: string
 *       - telephone: "(85)8222-0997"
 *         description: Telefone do usuário
 *         format: (XX)XXXX-XXXX
 *         type: string
 *     responses:
 *       201:
 *         description: Telefone e Celular cadastrado
 *         example:
 *           message: {
 *                       "user_id": "2",
 *                       "cellphone": "(85)94222-0997",
 *                       "telephone": "(85)9729-8806",
 *                       "created_at": "2020-08-05 10:59:59",
 *                       "updated_at": "2020-08-05 10:59:59",
 *                       "id": 2
 *                    }
 *       404:
 *         description: Usuário não encontrado
 *
 *   get:
 *     summary: Listando endereços.
 *     responses:
 *       200:
 *         description: Lista dos Telephones e Celular ou não existe para esse usuário.
 *       404:
 *         description: Usuário não encontrado.
 *
 *  /api/telephone/{user_id}/{telephone_id}:
 *   get:
 *     summary: Lista endereço
 *     responses:
 *       200:
 *         description: Lista um Telefone e Celular especifico.
 *       404:
 *         description: Usuário ou Telefone e Celular não encontrado.
 *       400:
 *         description: Esse telefone não pertence a este usuário.
 *
 *   put:
 *     summary: Atualizando Telefones
 *     parameters:
 *       - cellphone: "(85)94222-0997"
 *         description: Celular do usuário
 *         format: (XX)9XXXX-XXXX
 *         type: string
 *       - telephone: "(85)8222-0997"
 *         description: Telefone do usuário
 *         format: (XX)XXXX-XXXX
 *         type: string
 *     responses:
 *       204:
 *         description: Telefone atualizado.
 *       404:
 *         description: Usuário ou Telefone e Celular não encontrado.
 *       400:
 *         description: Esse telefone não pertence a este usuário.
 *   delete:
 *     summary: Deletando Telefones
 *     responses:
 *       204:
 *         description: Telefone deletado.
 *       404:
 *         description: Usuário ou Telefone e Celular não encontrado.
 *       400:
 *         description: Esse telefone não pertence a este usuário.
 */
