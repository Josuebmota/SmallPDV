const { rule } = use('Validator');

class Telephone {
  get rules() {
    return {
      cellphone: [
        rule('unique', 'telephones'),
        rule('regex', /^\([1-9]{2}\)(?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/),
      ],
      telephone: [
        rule('unique', 'telephones'),
        rule('regex', /^\([1-9]{2}\)[0-9]{4}-[0-9]{4}$/),
      ],
    };
  }

  get messages() {
    return {
      'cellphone.unique': 'Celular já existe',
      'cellphone.regex': 'Celular invalido, (xx)9xxxx-xxxx',
      'telephone.unique': 'Telefone já existe',
      'telephone.regex': 'Telefone invalido, (xx)xxxx-xxxx',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages });
  }
}

module.exports = Telephone;
