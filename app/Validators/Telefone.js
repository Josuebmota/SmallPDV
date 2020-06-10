const { rule } = use('Validator');

class Telefone {
  get rules() {
    return {
      celular: [
        rule('unique', 'telefones'),
        rule('regex', /^\([1-9]{2}\)(?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/),
      ],
      telefone: [
        rule('unique', 'telefones'),
        rule('regex', /^\([1-9]{2}\)[0-9]{4}-[0-9]{4}$/),
      ],
    };
  }

  get messages() {
    return {
      'celular.unique': 'Celular já existente',
      'celular.regex': 'Formato celular inválido (xx)9xxx-xxxx',
      'telefone.unique': 'Telefone já existente',
      'telefone.regex': 'Formato telefone inválido (xx)xxxx-xxxx',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Telefone;
