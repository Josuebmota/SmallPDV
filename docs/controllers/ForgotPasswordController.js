/**
 * @swagger
 * forgotPassword:
 *  /api/forgot:
 *   post:
 *     summary: Envio de email de recuperação de senha.
 *     parameters:
 *       - email: "joanderson@gmail.com"
 *         description: Email
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Email enviado
 *       404:
 *         description: Usuário não encontrado
 */
