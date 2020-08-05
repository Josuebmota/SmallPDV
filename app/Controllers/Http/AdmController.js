/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Employee = use('App/Models/Employee');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Address = use('App/Models/Address');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Telephone = use('App/Models/Telephone');

const Database = use('Database');

class AdmController {
  async store({ request, response }) {
    const trx = await Database.beginTransaction();

    const dataUser = request.only(['name', 'email', 'cpf', 'password']);

    const dataEmployee = request.only(['type']);

    const dataAddress = request.only([
      'cep',
      'street',
      'number',
      'neighborhood',
      'city',
      'state',
      'complement',
      'description',
    ]);

    const dataTelephone = request.only(['cellphone', 'telephone']);

    const { id, nome, email } = await User.create(dataUser, trx);

    const { type } = await Employee.create(
      { user_id: id, ...dataEmployee },
      trx
    );

    if (Object.entries(dataAddress).length !== 0) {
      await Address.create(
        {
          user_id: id,
          ...dataAddress,
        },
        trx
      );
    }
    if (Object.entries(dataTelephone).length !== 0) {
      await Telephone.create(
        {
          user_id: id,
          ...dataTelephone,
        },
        trx
      );
    }

    trx.commit();

    return response
      .status(201)
      .json({ id, nome, email, type, dataAddress, dataTelephone });
  }
}

module.exports = AdmController;
