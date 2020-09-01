const sgMail = require('@sendgrid/mail')
const { send } = require('@sendgrid/mail')

const sendgridAPIkey = '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'

sgMail.setApiKey(sendgridAPIkey)

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


module.exports = {
    sendWelcomeMail
}