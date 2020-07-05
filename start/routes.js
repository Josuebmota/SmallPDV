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
Route.post('/adm', 'AdmController.store').validator('Employee');

// Autentificação
Route.post('/session', 'SessionController.login').validator('Session');
Route.post('/forgot', 'ForgotPasswordController.forgot').validator('Forgot');
Route.post('/reset', 'ResetPasswordController.reset').validator('Reset');

Route.group(() => {
  // Empregados
  Route.post('employee', 'EmployeeController.store').validator('Employee');
  Route.put('employee/:id', 'EmployeeController.update').validator(
    'UserUpdate'
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
  Route.put('client/:id', 'ClientController.update').validator('UserUpdate');
  Route.resource('client', 'ClientController').only([
    'index',
    'show',
    'destroy',
  ]);

  // Endereços
  Route.post('address/:id', 'AddressController.store').validator('Address');
  Route.put('address/:id/:address_id', 'AddressController.update').validator(
    'Address'
  );
  Route.get('address/:id', 'AddressController.index');
  Route.get('address/:id/:address_id', 'AddressController.show');
  Route.delete('address/:id/:address_id', 'AddressController.destroy');

  // Telefones/Celular
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

// products
Route.group(() => {
  Route.resource('products', 'ProductController').apiOnly().except(['store']);
  Route.post('products', 'ProductController.store').validator('Product');
  // Route.get('products/code/:code', 'ProductController.showByCode');
});

// categories
Route.group(() => {
  Route.resource('categories', 'CategoryController').apiOnly();
});
