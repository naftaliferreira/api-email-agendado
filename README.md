# 📧 API de E-mail Agendado

Este projeto é uma API Node.js para agendar e enviar e-mails de forma automática em horários definidos. Ele resolve a necessidade de disparos programados de comunicação, facilitando a automação de newsletters, lembretes ou notificações.

---

## Gerar o acesso do google para utilizar na API

Como Gerar uma Senha de App do Google
Siga estes passos para obter a senha correta:

Vá para a página de gerenciamento da sua conta Google: <https://myaccount.google.com/>

No menu lateral, clique em "Segurança".

Em "Como você faz login no Google", verifique se a "Verificação em duas etapas" está ativada. Se não estiver, você precisará ativá-la primeiro.

Após a Verificação em duas etapas estar ativa, a opção "Senhas de apps" aparecerá logo abaixo. Clique nela.

Você será solicitado a fazer login novamente.

Na página "Senhas de apps", selecione o aplicativo e o dispositivo. Para este projeto, você pode escolher "Outro (nome personalizado)" e digitar "Nodemailer" ou o nome que preferir.

Clique em "Gerar". O Google irá exibir uma senha de 16 caracteres. Copie essa senha.

---

## 💻 Tecnologias Utilizadas

* Node.js: Ambiente de execução JavaScript no servidor.

* Express: Framework web para construir a API.

* Nodemailer: Módulo para o envio de e-mails.

* Node-Cron: Ferramenta para agendar tarefas em segundo plano (cron jobs).

* Dotenv: Gerenciamento de variáveis de ambiente para segurança das credenciais.

---

## ✨ Funcionalidades

* **Endpoint de API:** Uma rota (POST) para receber solicitações de agendamento de e-mails.

* **Agendamento Preciso:** Utiliza cron jobs para garantir que o e-mail seja enviado na data e hora exata.

* **Serviço de E-mail Modular:** A lógica de envio de e-mails é separada, facilitando a manutenção e a reutilização.

* **Segurança:** Credenciais de e-mail são armazenadas em variáveis de ambiente, protegendo informações sensíveis.

---

## 🚀 Como Rodar o Projeto

Siga estes passos para configurar e executar a API em sua máquina local.

1. **Clone o repositório:**

```
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. **Instale as dependências:**

```
npm install
```

3. **Configura as variáveis de ambiente:**

* Crie um arquivo .env na raiz do projeto.

* Adicione suas credenciais de e-mail, utilizando uma senha de app do Google para maior segurança.

```
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app-aqui
```

4. **Inicie o servidor:**

```node index.js```

A API estará rodando em ```http://localhost:3000.```

---

## 📂 Estrutura do Projeto

A arquitetura do projeto segue o princípio de separação de responsabilidades.

```
/
├── index.js                  # Ponto de entrada da API e rotas
├── emailService.js           # Lógica para enviar e-mails (Nodemailer)
├── package.json              # Metadados e dependências do projeto
└── .env                      # Variáveis de ambiente
```

## 🧠 Destaques do Código

**Serviço de E-mail** (em emailService.js)

Este módulo abstrai toda a complexidade de envio de e-mails, utilizando as variáveis de ambiente para as credenciais.

```
// emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso:', info.response);
    return true;
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return false;
  }
}

module.exports = { sendEmail };
```

---

## API e Agendamento (em index.js)

O arquivo principal que lida com as requisições HTTP e, posteriormente, com o agendamento de tarefas.

```
// index.js
const express = require('express');
const { sendEmail } = require('./emailService');
const cron = require('node-cron');

const app = express();
const PORT = 3000;

app.use(express.json());

// Exemplo de como agendar um e-mail com node-cron
// Esta é uma tarefa agendada para rodar a cada 30 segundos
cron.schedule('*/30 * * * * *', () => {
    console.log('Verificando e-mails agendados...');
    // Lógica para enviar e-mails aqui
    // Exemplo:
    // sendEmail({
    //     to: 'destinatario@exemplo.com',
    //     subject: 'Lembrete',
    //     html: '<p>Não se esqueça de algo!</p>'
    // });
});

app.get('/', (req, res) => {
  res.send('API de E-mail Agendado funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```