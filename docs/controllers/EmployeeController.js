/**
 * @swagger
 * employee:
 *  /api/employee:
 *   post:
 *     summary: Criação de usuários.
 *     parameters:
 *       - name: "Robson"
 *         description: Nome do usuário
 *         required: true
 *         type: string
 *       - email: "robson@gmail.com"
 *         description: Email do empregado
 *         required: true
 *         type: string
 *       - cpf: "258.720.255-55"
 *         description: cpf do empregado
 *         required: true
 *         type: string
 *         format: XXX.XXX.XXX-XX
 *       - type: "EMPLOYEE"
 *         description: Tipo de empregado
 *         required: true
 *       - password: "coxinha"
 *         description: Password do empregado
 *         required: true
 *         type: string
 *       - password_confirmation: "coxinha"
 *         description: Confirmação do Password
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Empregado criado monstrando algumas informações
 *         example:
 *           message: {
 *                     "id": 2,
 *                     "email": "robson@gmail.com",
 *                     "type": "EMPLOYEE"
 *                   }
 *       401:
 *         description: Sem autorização para cadastrar
 *         example:
 *           message: 'Você não tem autorização para efetuar essa ação'
 *
 *   get:
 *     summary: Listando Empregados.
 *     responses:
 *       200:
 *         description: Lista dos empregados com algumas informações.
 *         example:
 *           message: {
 *                     "id": 2,
 *                     "user_id": 2,
 *                     "name": "JoandRobsonerson",
 *                     "email": "robson@gmail.com",
 *                     "type": "EMPLOYEE"
 *                   }
 *       401:
 *         description: Sem autorização para cadastrar
 *         example:
 *           message: 'Você não tem autorização para efetuar essa ação'
 *       404:
 *         description: Empregados não encontrados
 *         example:
 *           message: 'Não foi encontrado nenhum empregado'
 *
 *  /api/employee/{user_id}:
 *   get:
 *     summary: Lista Empregado
 *     responses:
 *       200:
 *         description: Lista todas as informações do empregado.
 *         example:
 *           message: {
 *           "employee": [
 *             {
 *               "id": 1,
 *               "name": "Joanderson",
 *               "email": "joanderson@gmail.com",
 *               "cpf": "258.722.225-55",
 *               "employees": {
 *                 "id": 1,
 *                 "user_id": 1,
 *                 "type": "ADM",
 *                 "created_at": "2020-08-04 11:30:46",
 *                 "updated_at": "2020-08-04 11:30:46"
 *               },
 *               "addresses": [
 *                 {
 *                   "id": 1,
 *                   "user_id": 1,
 *                   "cep": "60710-730",
 *                   "street": "Rua Pegasus",
 *                   "number": "7878",
 *                   "neighborhood": "Alto Alegre",
 *                   "city": "Limbo",
 *                   "state": "CE",
 *                   "created_at": "2020-08-04 11:30:46",
 *                   "updated_at": "2020-08-04 11:30:46"
 *                 }
 *               ],
 *               "telephones": [
 *                 {
 *                   "id": 1,
 *                   "user_id": 1,
 *                   "cellphone": "(85)98657-8897",
 *                   "telephone": "(85)3498-0896",
 *                   "created_at": "2020-08-04 11:30:46",
 *                   "updated_at": "2020-08-04 11:30:46"
 *                 }
 *               ]
 *             }
 *           ]
 *         }
 *       400:
 *         description: Usuário não é um empregado.
 *       401:
 *         description: Sem autorização para cadastrar.
 *         example:
 *           message: 'Você não tem autorização para efetuar essa ação'
 *   put:
 *     summary: Atualizando Empregado
 *     parameters:
 *       - name: "Natalia Alfedro"
 *         description: Nome do usuário
 *         type: string
 *       - email: "natalisa@gmail.com"
 *         description: Email do empregado
 *         type: string
 *       - cpf: "258.722.957-05"
 *         description: cpf do empregado
 *         type: string
 *         format: XXX.XXX.XXX-XX
 *       - type: "ADM"
 *         description: Tipo de empregado
 *       - password: "estrogonofe"
 *         description: Password do empregado
 *         type: string
 *       - password_confirmation: "estrogonofe"
 *         description: Confirmação do Password
 *         required: true, caso o password for atribuido
 *         type: string
 *     responses:
 *       204:
 *         description: Empregado atualizado.
 *       400:
 *         description: Usuário não é um empregado.
 *       401:
 *         description: Sem autorização para cadastrar.
 *         example:
 *           message: 'Você não tem autorização para efetuar essa ação'
 *       404:
 *         description: Empregado não encontrado
 *         example:
 *           message: 'Usuário não encontrado'
 *   delete:
 *     summary: Deletando Empregados
 *     responses:
 *       204:
 *         description: Empregado deletado.
 *       400:
 *         description: Usuário não é um empregado.
 *       401:
 *         description: Sem autorização para deletar.
 *         example:
 *           message: 'Você não tem autorização para efetuar essa ação'
 *       404:
 *         description: Empregado não encontrado
 *         example:
 *           message: 'Usuário não encontrado'
 */
