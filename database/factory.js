/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    nome: faker.name(),
    email: faker.email(),
    cpf: faker.cpf(),
    celular: faker.phone({ country: 'br', mobile: true }),
    telefone: faker.phone({ country: 'br' }),
    cep: faker.zip({ plusfour: true }),
    logradouro: 'Rua França',
    numero: '321',
    cidade: 'Fortaleza',
    estado: 'CE',
    cargo: 'Administrador',
    password: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
  return {
    type: data.type || 'refreshtoken',
    token: faker.string({ length: 20 }),
    ...data,
  };
});
