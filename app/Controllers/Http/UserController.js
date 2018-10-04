'use strict'

const User = use("App/Models/User")

class UserController {

    async index () {
        const users = User.all()

        return users
    }
    
    async store ({ request }) {
        const data = request.only(['email', 'password', 'acess', 'status'])

        const user = await User.create(data)

        return user
    }

    async show ({ params }) {
        const user = await User.query().where('uuid', params.id)

        return user
    }

    async update ({ params, request, response }) {
        const user = await User.query().where('uuid', params.id).firstOrFail()

        const data = request.all()

        user.merge(data)

        await user.save()

        return user

    }
}

module.exports = UserController
