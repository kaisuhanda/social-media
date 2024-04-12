const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kaisuhanda@gmail.com",
        pass: "nvigsgskmolzqjav"
    }
})

module.exports = transporter