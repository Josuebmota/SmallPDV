const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Mail = use('Mail');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empregados = use('App/Models/Empregados');

const Env = use('Env');

class ForgotPasswordController {
  async forgot({ request, response }) {
    const email = request.input('email');

    const user = await Empregados.findBy('email', email);

    const random = await promisify(randomBytes)(24);
    const token = random.toString('hex');

    await user.tokens().create({
      token,
      type: 'ForgotPassword',
    });

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

    await Mail.send(
      'emails.forgotpassword',
      { name: user.nome, token, resetPasswordUrl },
      (message) => {
        message
          .to(user.email)
          .from('testemails913@gmail.com')
          .subject('Pegasus Ti - Recuperação de Senha');
      }
    );
    return response.status(200).send('Email enviado');
  }
}

module.exports = ForgotPasswordController;
