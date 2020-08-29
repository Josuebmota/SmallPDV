<h1 align = "center">
<strong>SmallPDV🔺</strong>
</h1>

<p align="center">
   <a href="https://www.linkedin.com/in/josu%C3%A9-batista-694bba135/">
      <img alt="Josué Batista" src="https://img.shields.io/badge/-JosuéBatista-FA8072?style=flat&logo=Linkedin&logoColor=white" />
   </a>
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/RafaelGoulartB/proffy?color=FA8072">
  <a href="https://github.com/Josuebmota/SmallPDV/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Josuebmota/SmallPDV?color=FA8072">
  </a> 
  <a href="https://github.com/Josuebmota/SmallPDV/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-FA8072">
  </a>
  <a href="https://github.com/Josuebmota/SmallPDV/stargazers"><img alt="Stargazers" src="https://img.shields.io/github/stars/Josuebmota/TaskManagement?color=FA8072&logo=github">
  </a>
</p>

## 👀 Demo Api
Você pode acessar a api, atravês do link abaixo:
>http://smallpdv.herokuapp.com <br>
<a href="https://www.heroku.com/"><img src="https://img.shields.io/badge/%E2%86%91_Deploy_to-Heroku-7056bf.svg?style=flat" />
</a>

## 📌 Tecnologias Usadas
🍀 NodeJs - Ambiente de execução javascript server-side. <br>
🔺 AdonisJs - FrameWork baseado no Node, cuja a finalidade neste projeto é a construção de api's <br>
👾 Heroku - Plataforma em nuvem, utilizado para deploy de diversas aplicações. <br> 
🛢️ Lucid Orm  - Trás a api, uma forma mais enxuta de consultar o banco. Baseado no Knex <br>
🔎 Vow - Utilizado para a execução de teste unitários e de integração. <br> 

## 🛠️ Ferramentas Utilizadas
- [Vs Code](https://code.visualstudio.com/)
- [Insomnia Designer](https://insomnia.rest/download/)

## 📁 Modelo de entidade e relacionamento
Tomando como base do que seria de fato um ponto de venda, foi elaborado as tabelas e suas relações.
<p align = "center">
<img src ="https://user-images.githubusercontent.com/34459397/89466459-4695de00-d74a-11ea-9f33-96e21f3f659f.png"/>
</p>

## 🚀 Execução
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

## 📡 Configurando o Insomnia Designer
Caso queira testar as rotas criadas, é aconselhavel usar o Insomnia, pois todas a requisições já estão construidas e arquitetadas nesse ambiente. Nas etapas, é relatado o processo de sua configuração.<br>
1 - Dê uma Fork na aplicação.<br>
2 - Instale o [Insomnia Designer](https://insomnia.rest/download/).<br>
3 - Gere um token de acesso, para o insomnia acessar seu github.<br>
4 - Dentro do insomnia acesse Create/GitClone e atríbua as informações.<br>
<p align ="center">
<img src = "https://user-images.githubusercontent.com/34459397/91640704-ebc46f00-e9f5-11ea-9399-fb5e8414e2c3.png" width= 500/>
</p>

## 🍏 Swagger 
Afim de trazer entedimento de cada rota desta api, basta acessar a rota:
>Homologação: http://smallpdv.herokuapp.com/swagger.json<br>
>Local: http://localhost:3333/swagger.json

Nessa rota, estará documentado o que cada função de um determinado controller ira efetuar.

## 🐛 Problemas

Sinta-se a vontade de registrar um novo problema, com um respectivo título e descrição no repositório do [SmallPDV](https://github.com/Josuebmota/SmallPDV/issues). Se encontrar a solução, avaliarei seu Pull Request.

## 👁️‍🗨️ Observações
- As rotas de ForgotPassword e ResetPassword não foram implementadas ainda
- E a documentação do Swagger ainda está incompleta

#### 👨‍💻 [](<[https://github.com/Josuebmota/SmallPDV](https://github.com/Josuebmota/SmallPDV)#autor>)Autores

Criado por [**Josué Batista Mota** ](https://github.com/Josuebmota) e [**Yvens Martins**](https://github.com/yvensm), <br>esse projeto está sobre [MIT license](./LICENSE) 📃.
