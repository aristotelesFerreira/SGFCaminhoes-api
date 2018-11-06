'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')
var fs = require('fs')
var path = require('path')

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')))
//console.log(path.join(__dirname, 'config.json'))

class AuthenticationController {
    async create ({ request, auth, response }) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password) 
        const user = await User
            .query()
            .where('email', email)
            .firstOrFail('password', password)

        const exists = await Token.query().where('user_id', user.id)

        if(exists[0] !== undefined ) {
            const driver = await Token.query().where('user_id', user.id).firstOrFail()
      
           // const data = request.all()
          
           driver.merge({user_id: user.id, token: token.token, type:'Bearer'})
      
            await driver.save()

            return {...token, user}

        }else{
            const save = await Token.create({user_id: user.id, token: token.token, type: 'Bearer'})

            return {...token, user}
        }
           
      
       
    }
    async sendEmail ({ }) {

        const nodemailer = require('nodemailer');
        const link = '<123456>'
        nodemailer.createTestAccount((err, account) => { 
        let transporter = nodemailer.createTransport({
           service: 'gmail',
           //host: 'smtp.ethereal.email',
           port: 587,
           secure: false,
           port: 25,
            auth: {
               
                user: config.email, // generated ethereal user
                pass: config.password// generated ethereal password
            },
            tls:{
                rejectUnauthorized: false
            }
        });
        let HelperOptions = {
            from : config.email,
            to: 'aristoteles.ferreira@outlook.com',
            subject: 'Recuperação de senha SGF-Caminhões',
            //text: 'Segue o link abaixo para recuperar sua senha\n'+ link,
            html: '<p>Clique <a href="http://localhost:3000/recovery_password/' + link + '">aqui</a> para resetar sua senha</p>'
           
        }
        transporter.sendMail(HelperOptions, (error, info) => {
            if(error) {
                return console.log(error)
            }
            console.log('The message was sent !')
            console.log(info)
        })
    
    })
    
    }
}

module.exports = AuthenticationController
