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
      'cellphone.unique': 'Existing cellphone',
      'cellphone.regex': 'Invalid cellphone, (xx)9xxx-xxxx',
      'telephone.unique': 'Existing telephones',
      'telephone.regex': 'Invalid telephone, (xx)xxxx-xxxx',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.json({ error: errorMessages[0].message });
  }
}

module.exports = Telephone;
