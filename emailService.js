// emailService.js
const nodemailer = require('nodemailer');

// 💡 DICA: Para Gmail, você precisa gerar uma "senha de app".
// Não use sua senha de login regular, pois isso pode ser um risco de segurança.
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou 'hotmail', 'outlook', 'yahoo', etc.
    auth: {
        user: 'SEU_EMAIL@gmail.com',
        pass: 'SUA_SENHA_DE_APP',
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