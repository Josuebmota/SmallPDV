const { rule } = use('Validator');

class EmployeePost {
  get rules() {
    return {
      nome: 'required',
      email: 'required|email|unique:empregados',
      cpf: [
        rule('required'),
        rule('unique', 'empregados'),
        rule('regex', /^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
      ],
      celular: [
        rule('unique', 'empregados'),
        rule('regex', /^\([1-9]{2}\)(?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/),
      ],
      telefone: [
        rule('unique', 'empregados'),
        rule('regex', /^\([1-9]{2}\)[0-9]{4}-[0-9]{4}$/),
      ],
      cep: [rule('regex', /^\d{5}[-]\d{3}$/)],
      password: 'required|confirmed',
    };
  }

  get messages() {
    return {
      'nome.required': 'Nome é obrigátorio',
      'email.required': 'E-mail é obrigátorio',
      'email.email': 'Forneça um e-mail valido',
      'email.unique': 'E-mail já existente',
      'cpf.required': 'CPF é obrigátorio',
      'cpf.unique': 'Cpf já existente',
      'cpf.regex': 'Formato cpf inválido xxx.xxx.xxx-xx',
      'celular.unique': 'Celular já existente',
      'celular.regex': 'Formato celular inválido (xx)9xxx-xxxx',
      'telefone.unique': 'Telefone já existente',
      'telefone.regex': 'Formato telefone inválido (xx)xxxx-xxxx',
      'tipo.required': 'Campo tipo é obrigátorio',
      'cep.regex': 'Formato cep inválido xxxx-xxx',
      'password.required': 'Campo password é obrigátorio',
      'password.confirmed': 'Password precisa ser confirmado',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = EmployeePost;
