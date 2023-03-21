const nodemailer = require('nodemailer')

const sendmailer = async (email, token, id) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: `${process.env.EMAIL}`,
            pass: 'okfpqnttmedwppuk'
        }
    })

    const mailOptions = {
        from: "adityasinha900@gmail.com",
        to: `${email}`,
        subject: "Reset email",
        html: `<p>Reset Password</p>
    <h1>Reset link <a href="http://localhost:3000/reset/${id}/${token}">Link</a></h1>
    <p>Token will expire in 15min </p>`
    }

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(400).json({
                success: "failure",
            })
        }
        else {
            return true
        }
    })
}

module.exports = {

    sendmailer
}
