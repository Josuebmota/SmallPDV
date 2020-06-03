const { rule } = use('Validator');

class User {
  get rules() {
    return {
      nome: 'required',
      email: 'required|email|unique:users',
      cpf: [
        rule('required'),
        rule('unique', 'users'),
        rule('regex', /^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
      ],
      celular: [
        rule('required'),
        rule('unique', 'users'),
        rule('regex', /^\([1-9]{2}\)(?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/),
      ],
      telefone: [
        rule('required'),
        rule('unique', 'users'),
        rule('regex', /^\([1-9]{2}\)[0-9]{4}-[0-9]{4}$/),
      ],
      cep: [rule('required'), rule('regex', /^\d{5}[-]\d{3}$/)],
      logradouro: 'required',
      numero: 'required',
      bairro: 'required',
      cidade: 'required',
      estado: 'required',
      tipo: 'required',
      password: 'required|confirmed',
    };
  }

  get messages() {
    return {
      'nome.required': 'Nome é obrigátorio',
      'email.required': 'E-mail é obrigátorio',
      'email.email': 'Fornece um e-mail valido',
      'email.unique': 'E-mail já existente',
      'cpf.required': 'CPF é obrigátorio',
      'cpf.unique': 'Celular já existente',
      'cpf.regex': 'Formato inválido',
      'celular.required': 'Celular é obrigátorio',
      'celular.regex': 'Formato inválido',
      'celular.unique': 'Celular já existente',
      'telefone.required': 'Telefone é obrigátorio',
      'telefone.unique': 'Telefone já existente',
      'telefone.regex': 'Formato inválido',
      'logradouro.required': 'Campo é obrigátorio',
      'numero.required': 'Campo é obrigátorio',
      'bairro.required': 'Campo é obrigátorio',
      'cidade.required': 'Campo é obrigátorio',
      'estado.required': 'Campo é obrigátorio',
      'tipo.required': 'Campo é obrigátorio',
      'password.required': 'Campo é obrigátorio',
      'password.confirmed': 'Campo precisa ser confirmado',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = User;
