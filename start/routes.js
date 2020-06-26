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
  Route.post('employee', 'EmployeeController.store').validator('EmployeePost');
  Route.put('employee/:id', 'EmployeeController.update').validator(
    'EmployeeUpdate'
  );
  Route.resource('employee', 'EmployeeController').only([
    'index',
    'show',
    'destroy',
  ]);

  // Perfil Empregado
  Route.get('profile', 'ProfileEmployeeController.index');

  // Clientes Controller
  Route.post('client', 'ClientController.store').validator('Client');
  Route.put('client/:id', 'ClientController.update').validator('Client');
  Route.resource('client', 'ClientController').only([
    'index',
    'show',
    'destroy',
  ]);

  // Endereços Cliente
  Route.post('address/:id', 'AddressController.store').validator('Address');
  Route.put('address/:id/:address_id', 'AddressController.update').validator(
    'Endereco'
  );
  Route.get('address/:id', 'AddressController.index');
  Route.get('address/:id/:address_id', 'AddressController.show');
  Route.delete('address/:id/:address_id', 'AddressController.destroy');

  // Telefones/Celular Cliente
  Route.post('telephone/:id', 'TelephoneController.store').validator(
    'Telephone'
  );
  Route.put(
    'telephone/:id/:telephone_id',
    'TelephoneController.update'
  ).validator('Telephone');
  Route.get('telephone/:id', 'TelephoneController.index');
  Route.get('telephone/:id/:telephone_id', 'TelephoneController.show');
  Route.delete('telephone/:id/:telephone_id', 'TelephoneController.destroy');
}).middleware('auth');
