const { v4: uuidv4} = require('uuid')
require('../resources/db/connection')()
const secretModel = require('../resources/db/models/Secret')

module.exports.create = async (event, context) => {

    context.callbackWaitForEmpyEventLoop = false
    
    const { name, email } = JSON.parse(event.body)
    const adminKey = uuidv4(),
    const externalId = uuidv4(),
    try{    
        await secretModel.create({
            owner: name,
            ownerEmail: email,
            adminKey,
            externalId,
        })

    }catch(err){
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false
            })
        }
    }

}

module.exports.get = async (event) => {}

module.exports.draw = async (event) => {}