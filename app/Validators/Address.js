const { rule } = use('Validator');

class Address {
  get rules() {
    return {
      cep: [rule('required'), rule('regex', /^\d{5}[-]\d{3}$/)],
      street: 'required',
      number: 'required',
      neighborhood: 'required',
      city: 'required',
      state: 'required|max:2',
    };
  }

  get messages() {
    return {
      'cep.required': 'Cep is required',
      'cep.regex': 'Invalid cep, xxxx-xxx',
      'number.required': 'Cep is required',
      'neighborhood.required': 'Cep is required',
      'city.required': 'Cep is required',
      'state.required': 'Cep is required',
      'state.max': 'State must have a maximum of 2',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages });
  }
}

module.exports = Address;
