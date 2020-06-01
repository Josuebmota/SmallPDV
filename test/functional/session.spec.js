const { test, trait } = use('Test/Suite')('Post');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');

test('Session User', async ({ assert, client }) => {
  const sessionPayload = {
    email: 'josue@gmail.com',
    password: '12345',
  };
  await Factory.model('App/Models/User').create(sessionPayload);

  const response = await client.post('/session').send(sessionPayload).end();

  response.assertStatus(200);
  assert.exists(response.body.token);
});
