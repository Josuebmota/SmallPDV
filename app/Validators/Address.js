const { rule } = use('Validator');

class Address {
  get rules() {
    return {
      cep: [rule('required'), rule('regex', /^\d{5}[-]\d{3}$/)],
      logradouro: 'required',
      numero: 'required',
      bairro: 'required',
      cidade: 'required',
      estado: 'required|max:2',
    };
  }

  get messages() {
    return {
      'cep.required': 'Campo cep é obrigatório',
      'cep.regex': 'Formato cep inválido xxxx-xxx',
      'numero.required': 'Campo numero é obrigatório',
      'bairro.required': 'Campo bairro é obrigatório',
      'cidade.required': 'Campo cidade é obrigatório',
      'estado.required': 'Campo estado é obrigatório',
      'estado.max': 'Campo estado deve ter no maximo 2',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Address;
