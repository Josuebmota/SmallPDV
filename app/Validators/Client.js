const { rule } = use('Validator');

class Client {
  get rules() {
    return {
      email: 'email|unique:clientes',
      cpf: [
        rule('unique', 'clientes'),
        rule('regex', /^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
      ],
      celular: [
        rule('unique', 'telefones'),
        rule('regex', /^\([1-9]{2}\)(?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/),
      ],
      telefone: [
        rule('unique', 'telefones'),
        rule('regex', /^\([1-9]{2}\)[0-9]{4}-[0-9]{4}$/),
      ],
      cep: [rule('regex', /^\d{5}[-]\d{3}$/)],
    };
  }

  get messages() {
    return {
      'email.email': 'Forneça um e-mail valido',
      'email.unique': 'E-mail já existente',
      'cpf.unique': 'Cpf já existente',
      'cpf.regex': 'Formato cpf inválido xxx.xxx.xxx-xx',
      'celular.unique': 'Celular já existente',
      'celular.regex': 'Formato celular inválido (xx)9xxx-xxxx',
      'telefone.unique': 'Telefone já existente',
      'telefone.regex': 'Formato telefone inválido (xx)xxxx-xxxx',
      'cep.regex': 'Formato cep inválido xxxx-xxx',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Client;
