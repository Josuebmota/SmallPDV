/**
 * @swagger
 * profileEmployee:
 *  /api/profile:
 *   get:
 *     summary: Listando empregado logado.
 *     responses:
 *       200:
 *         description: Empregado listado.
 *         example:
 *           message:
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
 *
 */
