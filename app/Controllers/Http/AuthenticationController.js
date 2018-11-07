'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')
const uuidv4 = require('uuid/v4')
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

    async sendEmail ({ request, response }) {
        const nodemailer = require('nodemailer');
        const { email } = request.all()

     
        const user = await User.query().where('email', email)

        if(user.length >= 1){

            const user = await User.query().where('email', email).firstOrFail()
            const uuid = uuidv4()
            user.merge({recovery_uuid: uuid})

            await user.save()

            nodemailer.createTestAccount((err, account) => { 
                let transporter = nodemailer.createTransport({
                   service: 'gmail',
                   port: 587,
                   secure: false,
                   port: 25,
                    auth: {
                       
                        user: config.email, 
                        pass: config.password
                    },
                    tls:{
                        rejectUnauthorized: false
                    }
                });
                let HelperOptions = {
                    from : config.email,
                    to: user.email,
                    subject: 'Nova Senha - SGFCaminhões',
                    //text: 'Segue o link abaixo para recuperar sua senha\n'+ link,
                    html: ' <p>Clique <a href="http://localhost:3000/recovery_password/' + uuid + '">aqui</a> para cadastrar uma nova senha</p>'
                   
                }
                transporter.sendMail(HelperOptions, (error, info) => {
                    if(error) {
                        return console.log(error)
                    }
                    console.log(info)
                    return 'e-mail enviado com sucesso'
                })
            
            })

        }else {
            return  response.status(206).send('e-mail não encontrado')
        } 
       
        
    
    }
}

module.exports = AuthenticationController
