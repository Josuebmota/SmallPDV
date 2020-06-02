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

Route.post('/create', 'UserController.create').validator('User');
Route.post('/session', 'SessionController.login').validator('Session');
Route.post('/forgot', 'ForgotPasswordController.forgot').validator('Forgot');
Route.post('/reset', 'ResetPasswordController.reset').validator('Reset');
