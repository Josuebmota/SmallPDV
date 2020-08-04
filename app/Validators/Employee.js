const { rule } = use('Validator');

class Employee {
  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      cpf: [
        rule('unique', 'users'),
        rule('regex', /^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
      ],
      cellphone: [
        rule('unique', 'telephones'),
        rule('regex', /^\([1-9]{2}\)(?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/),
      ],
      telephone: [
        rule('unique', 'telephones'),
        rule('regex', /^\([1-9]{2}\)[0-9]{4}-[0-9]{4}$/),
      ],
      cep: [rule('regex', /^\d{5}[-]\d{3}$/)],
      type: 'required',
      password: 'required|confirmed|min:6',
    };
  }

  get messages() {
    return {
      'name.required': 'Name is required',
      'email.required': 'E-mail is required',
      'email.email': 'Invalid e-mail',
      'email.unique': 'Existing e-mail',
      'cpf.unique': 'Existing cpf',
      'cpf.regex': 'Invalid cpf, xxx.xxx.xxx-xx',
      'cellphone.unique': 'Existing cellphone',
      'cellphone.regex': 'Invalid cellphone (xx)9xxx-xxxx',
      'telephone.unique': 'Existing telephone',
      'telephone.regex': 'Invalid telephone, (xx)xxxx-xxxx',
      'type.required': 'Type is required',
      'cep.regex': 'Invalid cep, xxxx-xxx',
      'password.required': 'Password is required',
      'password.confirmed': 'Password needs to be confirmed',
      'password.min': 'Password precisa ser maior que 6 caracteres',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Employee;
