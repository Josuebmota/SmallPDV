/**
 * @swagger
 * resetPassword:
 *  /api/reset:
 *   post:
 *     summary: Resetar a senha.
 *     parameters:
 *       - token: "Bearer Token"
 *         description: Email
 *         required: true
 *         type: string
 *       - password: "coxinha"
 *         description: Password
 *         required: true
 *         type: string
 *       - password_confirmation: "coxinha"
 *         description: Confirmação do Password
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Senha resetada
 *       400:
 *         description: Data inspirou
 */
