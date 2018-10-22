'use strict'

const User = use('App/Models/User')

class AuthenticationController {
    async create ({ request, auth, response }) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password) 
        const user = await User
            .query()
            .where('email', email)
            .firstOrFail('password', password)

        return {...token, user}
       
    }
}

module.exports = AuthenticationController
