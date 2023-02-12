import nodemailer from "nodemailer"
import Mailgen from "mailgen"
import ENV from "../config.js"

// https://ethereal.email/create

let nodeConfig = {
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service : "gmail",
    auth: {
        user: ENV.EMAIl, // generated ethereal user
        pass: ENV.PASSWORD, // generated ethereal password
    },
}

let transporter = nodemailer.createTransport(nodeConfig)

let MailGenerator = new Mailgen({
    theme : "default",
    product : {
        name : "Chinmay Sonawane Login APP",
        link : "https://chinmay29hub-login-app.netlify.app/"
    }
})

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body

    // body of email
    var email = {
        body : {
            name : username,
            intro : text || "Welcome to this-fucking-CRUD-apps - Login APP. Very Excited to have you on board",
            outro : "Need Help? Just reply to this Email. I 'd love to help"
        }
    }

    var emailBody = MailGenerator.generate(email)

    let message = {
        from : ENV.EMAIl,
        to : userEmail,
        subject : subject || "Signup Successful",
        html : emailBody
    }
    //send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg : "You should fucking receive the email now!!!" })
        })
        .catch(error => {
            res.status(500).send({ error })
        })
}