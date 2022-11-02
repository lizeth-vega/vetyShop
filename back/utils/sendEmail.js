const { SchemaTypeOptions } = require("mongoose");
const nodemailer = require("nodemailer")

const sendEmail = async options => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "9297191a27bd91",
            pass: "42b676b0415fbc"
        }
    });
    const mensaje = {
        from: "VetyShop Store <noreply@vetyshop.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
    }

    await transport.sendMail(mensaje)
}

module.exports = sendEmail;