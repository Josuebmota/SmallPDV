const { test, trait } = use('Test/Suite')('ForgotPassword');
const { subHours, format } = require('date-fns');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Mail = use('Mail');
const Database = use('Database');
const Hash = use('Hash');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('Teste de Esquecer a senha', async ({ assert, client }) => {
  Mail.fake();
  const email = 'josuebatistam1@gmail.com';

  const user = await Factory.model('App/Models/Empregados').create({ email });

  const response = await client.post('/forgot').send({ email }).end();

  response.assertStatus(200);

  const token = await user.tokens().first();

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, email);

  assert.include(token.toJSON(), {
    type: 'ForgotPassword',
  });
  Mail.restore();
});

test('Resetar senha', async ({ assert, client }) => {
  const email = 'josuebatistam1@gmail.com';

  const user = await Factory.model('App/Models/Empregados').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();

  response.assertStatus(200);

  await user.reload();

  const checkPassword = await Hash.verify('123456', user.password);

  assert.isTrue(checkPassword);
});

test('Resetar o password depoist de 2hr do forgotpassword ser requisitado', async ({
  client,
}) => {
  const email = 'josuebatistam1@gmail.com';

  const user = await Factory.model('App/Models/Empregados').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  const dateWithSub = format(subHours(new Date(), 2), 'yyyy-MM-dd HH:ii:ss');

  await Database.table('tokens')
    .where('token', userToken.token)
    .update('created_at', dateWithSub);

  await userToken.reload();

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();

  response.assertStatus(400);
});
