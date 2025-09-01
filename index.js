// index.js
const { sendEmail } = require('./emailService');

// Configurações do e-mail de teste
const testMailOptions = {
    from: '"Seu Nome" <SEU_EMAIL@gmail.com>',
    to: 'DESTINATARIO@exemplo.com', // Altere para o seu e-mail de teste
    subject: 'Teste de E-mail Agendado',
    html: '<h1>Olá!</h1><p>Este é um e-mail de teste para verificar se o Nodemailer está funcionando corretamente.</p>',
};

// Chama a função de envio
sendEmail(testMailOptions);

console.log('Verificando o status do servidor...');
// A execução vai continuar, mas o console.log vai rodar antes da promessa ser resolvida