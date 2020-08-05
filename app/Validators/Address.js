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
      'cep.required': 'Cep é obrigatório',
      'cep.regex': 'Cep invalido, xxxx-xxx',
      'number.required': 'Número obrigatório',
      'neighborhood.required': 'Bairro é obrigatório',
      'city.required': 'Cidade é obrigatório',
      'state.required': 'Estado é obrigatório',
      'state.max': 'Estado deve ter no maximo dois caracteres',
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
