# AdonisJs SmallPDV 🔺
>Link Homologação: http://smallpdv.herokuapp.com

### Tecnologias Usadas
🍀 NodeJs - Ambiente de execução javascript server-side. <br>
🔺 AdonisJs - FrameWork baseado no Node, cuja a finalidade neste projeto é a construção de api's <br>
👾 Heroku - Plataforma em nuvem, utilizado para deploy de diversas aplicações. <br> 
🛢️ Lucid Orm  - Trás a api, uma forma mais enxuta de consultar o banco. Baseado no Knex <br>
🔎 Vow - Utilizado para a execução de teste unitários e de integração. <br> 

### Ferramentas Utilizadas
- [Vs Code](https://code.visualstudio.com/)
- [Insomnia Designer](https://insomnia.rest/download/)

### Modelo de entidade e relacionamento
![MER](https://user-images.githubusercontent.com/34459397/89466459-4695de00-d74a-11ea-9f33-96e21f3f659f.png)

### Execução
Antes de executar é necessario mudar as variáveis de ambiente, localizadas no arquivo [.env](https://github.com/Josuebmota/ApiCadastroUser/blob/master/.env), você pode mudar as configurações de acordo com as suas preferências.

```
# Clone o repositório
git clone https://github.com/Josuebmota/SmallPDV.git

# Vá para o diretório do arquivo
cd SmallPDV

# Faça o download das dependências
yarn or npm i

# Caso não tenha criado um banco em seu ambiente de teste
CREATE DATABASE SmallPDV

# Rode as migrations
adonis migration:run

# Efetue a inserção de dados
localizada SmallPDV/test/database/testDB.sql

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
Afim de trazer entedimento de cada rota desta api, basta acessar a rota:
>Homologação: http://smallpdv.herokuapp.com/swagger.json<br>
>Local: http://localhost:3333/swagger.json

Nessa rota, estará documentado o que cada função de um determinado controller ira efetuar.

### Observações
- As rotas de ForgotPassword e ResetPassword não foram implementadas ainda
- E a documentação do Swagger ainda está incompleta

#### 👨‍💻 [](<[https://github.com/Josuebmota/SmallPDV](https://github.com/Josuebmota/SmallPDV)#autor>)Autores

- **Josué Batista Mota** - [GitHub](https://github.com/Josuebmota) - Email: [josuebatistam1@gmail.com](mailto:josuebatistam1@gmail.com)
- **Yvens Martins** - [GitHub](https://github.com/yvensm) - Email: [claudioyvens10@gmail.com](mailto:claudioyvens10@gmail.com)
