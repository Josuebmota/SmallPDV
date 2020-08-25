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

Route.get('/', ({ response }) => {
  return response
    .status(404)
    .json({ message: 'Bem-vindo a api de vendas PegasusTi' });
});
// RouteAdm first user
Route.post('/api/adm', 'AdmController.store').validator('Employee');

// Auth
Route.post('/api/session', 'SessionController.login').validator('Session');
Route.post('/api/forgot', 'ForgotPasswordController.forgot').validator(
  'Forgot'
);
Route.post('/api/reset', 'ResetPasswordController.reset').validator('Reset');

Route.group(() => {
  // Employee
  Route.post('employee', 'EmployeeController.store').validator('Employee');
  Route.get('employee', 'EmployeeController.index');
  Route.get('employee/:user_id', 'EmployeeController.show');
  Route.put('employee/:user_id', 'EmployeeController.update').validator(
    'UserUpdate'
  );
  Route.delete('employee/:user_id', 'EmployeeController.destroy');

  // ProfileEmployee
  Route.get('profile', 'ProfileEmployeeController.index');

  // Client
  Route.post('client', 'ClientController.store').validator('Client');
  Route.get('client', 'ClientController.index');
  Route.get('client/:user_id', 'ClientController.show');
  Route.put('client/:user_id', 'ClientController.update').validator(
    'UserUpdate'
  );
  Route.delete('client/:user_id', 'ClientController.destroy');

  // Address
  Route.post('address/:user_id', 'AddressController.store').validator(
    'Address'
  );
  Route.get('address/:user_id', 'AddressController.index');
  Route.get('address/:user_id/:address_id', 'AddressController.show');
  Route.put(
    'address/:user_id/:address_id',
    'AddressController.update'
  ).validator('Address');
  Route.delete('address/:user_id/:address_id', 'AddressController.destroy');

  // Telephones/Cellphone
  Route.post('telephone/:user_id', 'TelephoneController.store').validator(
    'Telephone'
  );
  Route.put(
    'telephone/:user_id/:telephone_id',
    'TelephoneController.update'
  ).validator('Telephone');
  Route.get('telephone/:user_id', 'TelephoneController.index');
  Route.get('telephone/:user_id/:telephone_id', 'TelephoneController.show');
  Route.delete(
    'telephone/:user_id/:telephone_id',
    'TelephoneController.destroy'
  );

  // Product
  Route.resource('product', 'ProductController')
    .apiOnly()
    .validator(new Map([[['product.store'], ['Product']]]));

  // Categories
  Route.resource('category', 'CategoryController')
    .apiOnly()
    .except(['update', 'destroy'])
    .validator(new Map([[['category.store'], ['Category']]]));

  // ProductCategory
  Route.post(
    'productcategory/:product_id',
    'ProductCategoryController.store'
  ).validator('ProductCategory');
  Route.delete(
    'productcategory/:product_id',
    'ProductCategoryController.destroy'
  );

  // Stock
  Route.resource('stock', 'StockController')
    .apiOnly()
    .except(['store', 'destroy']);

  // Order
  Route.resource('order', 'OrderController')
    .apiOnly()
    .except(['update', 'destroy'])
    .validator(new Map([[['order.store'], ['Order']]]));

  // OrderClient
  Route.get('orderclient/:client_id', 'OrderClientController.index');
  Route.get('orderclient/:client_id/:order_id', 'OrderClientController.show');
}).prefix('api/').middleware('auth');
