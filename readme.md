
# 👥 Users DM

Aplicação web com **autenticação de usuários** e comunicação em tempo real, construída com **Node.js**, **Express**, **Socket.IO** e **MySQL**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

---

## ✨ Funcionalidades

- Autenticação de usuários com **JWT** (tempo de expiração configurável)
- Senhas criptografadas com **bcrypt**
- Persistência de dados em **MySQL**
- Comunicação em tempo real com **Socket.IO**
- Sessões e mensagens de feedback na interface (flash messages)
- Páginas renderizadas no servidor com **EJS**
- Arquitetura organizada em controllers, middlewares, models e rotas

## 🛠️ Tecnologias

| Dependência | Uso |
| --- | --- |
| [Express](https://expressjs.com/) | Servidor HTTP e rotas |
| [Socket.IO](https://socket.io/) | Comunicação em tempo real |
| [MySQL2](https://www.npmjs.com/package/mysql2) | Conexão com o banco MySQL |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Hash de senhas |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | Geração e validação de tokens JWT |
| [EJS](https://ejs.co/) | Template engine das views |
| [express-session](https://www.npmjs.com/package/express-session) | Sessões |
| [connect-flash](https://www.npmjs.com/package/connect-flash) | Mensagens flash |
| [body-parser](https://www.npmjs.com/package/body-parser) | Leitura de formulários e JSON |
| [dotenv](https://www.npmjs.com/package/dotenv) | Variáveis de ambiente |
| [store](https://www.npmjs.com/package/store) | Armazenamento local no navegador |

## 📁 Estrutura do projeto

```
Users-DM/
├── assets/
│   └── css/           # Estilos da interface
├── controllers/       # Regras de negócio das rotas
├── database/          # Conexão e configuração do banco de dados
├── express_conf/      # Configurações do Express
├── middlewares/       # Middlewares da aplicação
├── models/            # Acesso a dados
├── routes/            # Definição das rotas
├── socket_io/         # Eventos do Socket.IO
├── views/             # Templates EJS
├── application.js     # Ponto de entrada da aplicação
├── .env.example       # Exemplo de variáveis de ambiente
└── package.json
```

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- npm (já incluso com o Node.js)
- Servidor [MySQL](https://www.mysql.com/) em execução

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/higordday/Users-DM.git

# 2. Acesse a pasta do projeto
cd Users-DM

# 3. Instale as dependências
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
EXPRESS_SESSION_SECRET_KEY=sua_chave_secreta
SERVER_LISTENING_PORT=8000

DATABASE_SERVER_HOST=localhost
DATABASE_SERVER_PORT=3306
DATABASE_AUTHENTICATION_CREDENTIAL_USERNAME=seu_usuario
DATABASE_AUTHENTICATION_CREDENTIAL_PASSWORD=sua_senha
DATABASE_NAME=nome_do_banco

JWT_SECRET_TOKEN=seu_token_secreto
JWT_EXPIRES_IN=1d
```

| Variável | Descrição |
| --- | --- |
| `EXPRESS_SESSION_SECRET_KEY` | Chave secreta usada para assinar as sessões |
| `SERVER_LISTENING_PORT` | Porta em que o servidor vai rodar |
| `DATABASE_SERVER_HOST` | Endereço do servidor MySQL |
| `DATABASE_SERVER_PORT` | Porta do servidor MySQL |
| `DATABASE_AUTHENTICATION_CREDENTIAL_USERNAME` | Usuário do banco de dados |
| `DATABASE_AUTHENTICATION_CREDENTIAL_PASSWORD` | Senha do banco de dados |
| `DATABASE_NAME` | Nome do banco de dados |
| `JWT_SECRET_TOKEN` | Chave secreta usada para assinar os tokens JWT |
| `JWT_EXPIRES_IN` | Tempo de expiração do token (ex.: `1d`, `12h`) |

### Execução

```bash
node application.js
```

Depois, acesse `http://localhost:8000` (ou a porta que você definiu no `.env`).

## 🔌 Eventos do Socket.IO
  
| Evento | Direção | Descrição |
| --- | --- | --- |
| `join_chat` | cliente → servidor | Entra na sala informada (`chat_id`) |
| `leave_chat` | cliente → servidor | Sai da sala informada (`chat_id`) |
| `send` | cliente → servidor | Envia uma mensagem; ela é salva no banco e retransmitida para a sala (`data.chat`) |
| `broadcast` | servidor → cliente | Entrega a mensagem a todos os participantes da sala |