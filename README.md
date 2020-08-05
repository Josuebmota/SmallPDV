# Sistemas de vendas
>Link Homologação: http://pegasusti.herokuapp.com

### Tecnologias Usadas
🍀 NodeJs - Ambiente de execução javascript server-side. <br>
🔺 AdonisJs - FrameWork baseado no Node, cuja a finalidade neste projeto é a construção de api's <br>
👾 Heroku - Plataforma em nuvem, utilizado para deploy de diversas aplicações. <br> 
🛢️ Lucid Orm  - Trás a api, uma forma mais enxuta de consultar o banco. Baseado no Knex <br>
🔎 Vow - Utilizado para a execução de teste unitários e de integração. <br> 

### Ferramentas Utilizadas
- [Vs Code](https://code.visualstudio.com/)
- [Insomnia Designer](https://insomnia.rest/download/)
- Verificação da base de dados para teste por enquanto:
  - [MySql Workbench](https://dev.mysql.com/downloads/workbench/)
  - [PgAdmin](https://www.postgresql.org/)
  - [Sqlite](https://sqlitebrowser.org/)
  - [Docker](https://www.docker.com/), caso queira rodar em um container

### Modelo de entidade e relacionamento
![MER](https://user-images.githubusercontent.com/34459397/89466459-4695de00-d74a-11ea-9f33-96e21f3f659f.png)

### Execução
Antes de executar é necessario mudar as variáveis de ambiente, localizadas no arquivo [.env](https://github.com/Josuebmota/ApiCadastroUser/blob/master/.env), você pode mudar as configurações de acordo com as suas preferências. Porém é importante ressaltar que o banco utilizado em ambiente de produção é o Postgres, logo pode ocorrer alguma variação diante de alguns comandos bem específicos.

```
# Clone o repositório
git clone https://github.com/Josuebmota/SistemadeVendas

# Vá para o diretório do arquivo
cd SistemadeVendas

# Faça o download das dependências
yarn or npm i

# Caso não tenha criado um banco em seu ambiente de teste
CREATE DATABASE sistemasvendas

# Rode as migrations
adonis migration:run

# Efetue a inserção de dados
localizada SistemadeVendas/test/database/testDB.sql

# Start o projeto
adonis serve --dev
       or
adonis serve --dev --debug
```

### Configurando o Insomnia Designer
Essa ferramenta ira ajudar no tratamento de requisições do projeto. Siga as etapas abaixo

- Gerar um token de acesso à feramenta
![GenerateToken](https://user-images.githubusercontent.com/34459397/89244904-0a456f00-d5de-11ea-8f7e-e2881a7529c9.gif) 

- Atribua as informações ao seu insomnia
  ![Insomnia2](https://user-images.githubusercontent.com/34459397/89245230-c141ea80-d5de-11ea-8bd1-cca9d11acea7.png)

### Swagger 
Afim de trazer entidimento de cada rota desta api. Basta acessar a rota:
>Homologação: http://pegasusti.herokuapp.com/swagger.json
>Local: http://localhost:3333/swagger.json

Nessa rota, estará documentado o que cada função de um determinado controller ira efetuar.

### Regras na organização de atividades
É importante seguir essas diretrizes para deixa as ativiades bem explícitas.
- Criação de Branchs = (atividade/nome-da-atividade), exemplo:
```
		feature/order-payment
		bug/erro-products
```
- Commits = (Nome da branch: atividade feita), exemplo:
```
		feature/order-payment: Create Model Controller
```

- Não se esqueça de criar as rotas no insomnia, implementar a documentação no swagger e atualizar o modelo de entidade e relacionamento, caso necessário.

- Utilize o Prettier e Eslint.

- Pull Request, elabore uma descrição das funcionalidades implementadas e peça para alguém avaliar sua implementação, caso for necessario.

### Observações
- As rotas de ForgotPassword e ResetPassword não foram implementadas ainda
- E a documentação do Swagger ainda está incompleta
