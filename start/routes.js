/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

// Adm
Route.post('/adm', 'AdmController.store').validator('EmployeePost');

// Autentificação
Route.post('/session', 'SessionController.login').validator('Session');
Route.post('/forgot', 'ForgotPasswordController.forgot').validator('Forgot');
Route.post('/reset', 'ResetPasswordController.reset').validator('Reset');

Route.group(() => {
  // Empregados
  // Obs: Empregados já tem endereços e telefones em sua tabela
  Route.post('empregados', 'EmployeeController.store').validator(
    'EmployeePost'
  );
  Route.put('empregados/:id', 'EmployeeController.update').validator(
    'EmployeeUpdate'
  );
  Route.resource('empregados', 'EmployeeController').only([
    'index',
    'show',
    'destroy',
  ]);

  // Perfil Empregado
  Route.get('perfil', 'ProfileEmployeeController.index');

  // Clientes Controller
  Route.post('client', 'ClientController.store').validator('Client');
  Route.put('client/:id', 'ClientController.update').validator('Client');
  Route.resource('client', 'ClientController').only([
    'index',
    'show',
    'destroy',
  ]);

  // Endereços Cliente
  Route.post('address/:id', 'EnderecoController.store').validator('Address');
  Route.put('address/:id/:endereco_id', 'EnderecoController.update').validator(
    'Endereco'
  );
  Route.get('address/:id', 'EnderecoController.index');
  Route.get('address/:id/:endereco_id', 'EnderecoController.show');
  Route.delete('address/:id/:endereco_id', 'EnderecoController.destroy');

  // Telefones/Celular Cliente
  Route.post('telefones/:id', 'TelefoneController.store').validator('Telefone');
  Route.put(
    'telefones/:id/:telefone_id',
    'TelefoneController.update'
  ).validator('Telefone');
  Route.get('telefones/:id', 'TelefoneController.index');
  Route.get('telefones/:id/:telefone_id', 'TelefoneController.show');
  Route.delete('telefones/:id/:telefone_id', 'TelefoneController.destroy');
}).middleware('auth');
