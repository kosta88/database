const sgMail = require('@sendgrid/mail')
const { send } = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'kostiask@gmail.com',
//     from:'kostiask@gmail.com',
//     subject:'fist email trough node js',
//     text:'this is the subject of the email'
// }) 

const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kostiask@gmail.com',
        subject: 'Welcome',
        text: `Welcome to rsvp app ${name} , let me know how it is`         //template strings only with back >>>>   ``
    })
}


const sendCancelMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kostiask@gmail.com',
        subject: 'Cancel Account RSVP app',
        text: `Hi ${name} , we are sorry to hear you are leaving us....`         //template strings only with back >>>>   ``
    })
}


module.exports = {
    sendWelcomeMail,
    sendCancelMail
}