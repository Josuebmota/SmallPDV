const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('Login Usuario', async ({ assert, client }) => {
  const sessionPayload = {
    email: 'josuebatistam1@gmail.com',
    password: '12345',
  };
  await Factory.model('App/Models/User').create(sessionPayload);

  const response = await client.post('/session').send(sessionPayload).end();

  response.assertStatus(200);
  assert.exists(response.body.token);
});
