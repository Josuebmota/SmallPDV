const { isBefore, parseISO, subHours } = require('date-fns');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token');
class ResetPasswordController {
  async reset({ request, response }) {
    const { token, password } = request.only(['token', 'password']);

    const usertoken = await Token.findByOrFail('token', token);

    if (isBefore(parseISO(usertoken.created_at), subHours(new Date(), 2))) {
      return response
        .status(400)
        .json({ error: 'Data inspirou, por favor tente denevo' });
    }

    const user = await usertoken.user().fetch();

    user.password = password;

    await user.save();

    return response.status(200).send('Senha resetada com sucesso');
  }
}

module.exports = ResetPasswordController;
