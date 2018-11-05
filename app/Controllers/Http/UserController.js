'use strict'

const User = use("App/Models/User")

class UserController {

    async index ({auth, request}) {  
        const data = request.all()

        const users = User.query().where(data)
      
        return users

    }
    
    async store ({auth, request }) {
       // const acess = auth.user.acess
        //return auth.user
        //if(acess == 'admin'){
        const data = request.only(['name', 'email', 'password', 'acess', 'status'])

        const user = await User.create(data)

        return user
       // }else {
            return 'Sem permissão'
       // }
    }

    async show ({auth, params }) {
        const acess = auth.user.acess
        if(acess == 'admin'){
        const user = await User.query().where('uuid', params.id)

        return user
        }else {
            return 'Sem permissão'
        }
    }

    async update ({ auth, params, request, response }) {
        const acess = auth.user.acess
        if(acess == 'admin'){
        const user = await User.query().where('uuid', params.id).firstOrFail()

        const data = request.all()

        user.merge(data)

        await user.save()

        return user
        }else {
            return 'Sem permissão'
        }

    }
}

module.exports = UserController
