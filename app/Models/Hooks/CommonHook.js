'use strict'

const CommonHook = exports = module.exports = {}
const uuidv4 = require('uuid/v4')

CommonHook.getUuid = async (modelInstance) => {
    if (!modelInstance.uuid) {
        modelInstance.uuid = uuidv4()
       }
    return modelInstance
}
