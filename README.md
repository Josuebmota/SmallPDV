# Adonis ApiCadastroUsuario

Essa aplicação utiliza as seguintes ferramentas, provenientes do próprio adonis

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds
6. Tests

>Link Homologação: http://apicadastrouser.herokuapp.com

## Execução

Clone o repositório e execute o seguinte comando, para baixar as dependência:

```bash
yarn
```
Modifique as configurações de database, relacionado ao postgres e descomente as variáveis de ambiente, para a criação de um base local

> Migrations

Execute  as migrations

```js
adonis migration:run
```

E em seguida o programa

```js
adonis serve --test
```

### Observações
As rotas de ForgotPassword e ResetPassword não foram implementadas ainda
