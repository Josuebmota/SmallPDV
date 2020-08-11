/**
 * @swagger
 * /api/address/{user_id}:
 *   post:
 *     summary: Criação de Endereços.
 *     parameters:
 *       - cep:
 *         description: Cep de um determinado endereço do usuário
 *         format: XXXXX-XXX
 *         type: string
 *       - street:
 *         description: Rua Pegasus
 *         type: string
 *       - number:
 *         description: Numero da moradia
 *         type: string
 *       - complement:
 *         description: Complemento da moradia
 *         type: string
 *       - description:
 *         type: string
 *       - neighborhood:
 *         description: Bairro
 *         type: string
 *       - city:
 *         description: Cidade ou Município
 *         type: string
 *       - state:
 *         description: Estado
 *         type: string
 *     responses:
 *       201:
 *         description: Endereço criado
 *         example:
 *           message: {
 *                      "user_id": "2",
 *                      "cep": "60710-790",
 *                      "street": "Rua Pegasus",
 *                       "number": "7878",
 *                       "complement": "Casa A",
 *                       "description": "Perto da Disney",
 *                       "neighborhood": "Alto Alegre",
 *                       "city": "Limbo",
 *                       "state": "CE",
 *                       "created_at": "2020-08-05 09:56:29",
 *                       "updated_at": "2020-08-05 09:56:29",
 *                       "id": 2
 *                    }
 *       400:
 *         description: Já foi registrado esse endereço.
 *       404:
 *         description: Usuário não encontrado
 *
 *   get:
 *     summary: Listando endereços.
 *     parameters:
 *       - name: user_id
 *         description: id do usuario
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de endereços ou não existe endereços para esse usuário.
 *       404:
 *         description: Usuário não encontrado.
 *
 * /api/address/{user_id}/{address_id}:
 *   get:
 *     summary: Lista um endereço especifico
 *     parameters:
 *       - name: user_id
 *         description: id do usuario
 *         in: path
 *         required: true
 *       - name: address_id
 *         description: id do endereço
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Lista um endereço especifico.
 *       404:
 *         description: Usuário ou endereço não encontrado.
 *       400:
 *         description: Esse endereço não pertence a este usuário.
 *
 *   put:
 *     summary: Atualizando endereço
 *     parameters:
 *       - name: user_id
 *         description: id do usuario
 *         in: path
 *         required: true
 *       - name: address_id
 *         description: id do endereço
 *         in: path
 *         required: true
 *     responses:
 *       204:
 *         description: Endereço atualizado.
 *       400:
 *         description: Esse endereço não pertence a este usuário
 *       404:
 *         description: Usuário ou endereço não encontrado.
 *   delete:
 *     summary: Deletando endereço
 *     parameters:
 *       - name: user_id
 *         description: id do usuario
 *         in: path
 *         required: true
 *       - name: address_id
 *         description: id do endereço
 *         in: path
 *         required: true
 *     responses:
 *       204:
 *         description: Endereço deletado.
 *       400:
 *         description: Esse endereço não pertence a este usuário
 *       404:
 *         description: Usuário ou endereço não encontrado.
 */
