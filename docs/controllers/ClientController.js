/**
 * @swagger
 * client:
 *  /api/client:
 *   post:
 *     summary: Criação de usuários.
 *     parameters:
 *       - name: "Angelica"
 *         description: Nome do cliente
 *         required: true
 *         type: string
 *       - email: "angelica@gmail.com"
 *         description: Email do cliente
 *         required: true
 *         type: string
 *       - cpf: "258.922.265-55"
 *         description: cpf do cliente
 *         required: true
 *         type: string
 *         format: XXX.XXX.XXX-XX
 *       - money: 40
 *         description: Saldo do cliente
 *         required: false
 *         type: decimal
 *     responses:
 *       201:
 *         description: Cliente criado monstrando algumas informações
 *         example:
 *           message: {
 *                      "newClient": {
 *                        "id": 3,
 *                        "email": "angelica@gmail.com"
 *                       }
 *                    }
 *
 *   get:
 *     summary: Listando Clientes.
 *     responses:
 *       200:
 *         description: Lista dos clientes com algumas informações.
 *         example:
 *           message: {
 *                     "id": 2,
 *                     "user_id": 2,
 *                     "name": "Angelica",
 *                     "email": "angelica@gmail.com",
 *                     "money": 3
 *                   }
 *       404:
 *         description: Clientes não encontrados
 *         example:
 *           message: 'Não foi encontrado nenhum Cliente'
 *
 *  /api/client/{user_id}:
 *   get:
 *     summary: Lista cliente
 *     responses:
 *       200:
 *         description: Lista todas as informações do cliente.
 *         example:
 *           message: {
 *                      "client": [
 *                         {
 *                           "id": 3,
 *                           "name": "Angelica",
 *                           "email": "angelica@gmail.com",
 *                           "cpf": "258.922.265-55",
 *                           "clients": {
 *                             "id": 1,
 *                             "user_id": 3,
 *                             "money": 3,
 *                             "created_at": "2020-08-04 12:16:55",
 *                             "updated_at": "2020-08-04 12:16:55"
 *                           },
 *                           "addresses": [],
 *                           "telephones": []
 *                         }
 *                       ]
 *                     }
 *       400:
 *         description: Usuário não é um Cliente.
 *       401:
 *         description: Sem autorização para cadastrar.
 *         example:
 *           message: 'Você não tem autorização para efetuar essa ação'
 *   put:
 *     summary: Atualizando Cliente
 *     parameters:
 *       - name: "Yana Nogueira"
 *         description: Nome do usuário
 *         type: string
 *       - email: "yana@gmail.com"
 *         description: Email do Cliente
 *         type: string
 *       - cpf: "558.575.782-35"
 *         description: cpf do Cliente
 *         type: string
 *         format: XXX.XXX.XXX-XX
 *     responses:
 *       204:
 *         description: Cliente atualizado.
 *       400:
 *         description: Usuário não é um cliente.
 *       404:
 *         description: Cliente não encontrado
 *         example:
 *           message: 'Usuário não encontrado'
 *   delete:
 *     summary: Deletando Clientes
 *     responses:
 *       204:
 *         description: Cliente deletado.
 *       400:
 *         description: Usuário não é um cliente.
 *       401:
 *         description: Sem autorização para deletar.
 *         example:
 *           message: 'Você não tem autorização para efetuar essa ação'
 *       404:
 *         description: Cliente não encontrado
 *         example:
 *           message: 'Usuário não encontrado'
 */
