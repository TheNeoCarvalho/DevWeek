const { v4: uuidv4} = require('uuid')
require('../resources/db/connection')()
const secretModel = require('../resources/db/models/Secret')

module.exports.create = async (event, context) => {

    context.callbackWaitForEmpyEventLoop = false

    const { name, email } = JSON.parse(event.body)
    const adminKey = uuidv4()
    const externalId = uuidv4()

    try{    
        await secretModel.create({
            owner: name,
            ownerEmail: email,
            adminKey,
            externalId,
        })

    return {
        statusCode: 201,
        body: JSON.stringify({
            success: true,
            id: externalId,
            adminKey
        })
    }   

    }catch(err){
        console.log(err)
        return {
            
            statusCode: 500,
            body: JSON.stringify({
                success: false
            })
        }
    }
}

module.exports.get = async (event, context) => {

    context.callbackWaitForEmpyEventLoop = false

    const { id: externalId } = event.pathParameters
    const incomingAdminKey = event.headers['admin-key']

    try{    
        const { participants, adminKey, drawResults } = await secretModel.findOne({
            externalId,
        }).select('-_id participants adminKey drawResults').lean()

        const isAdmin = !!(incomingAdminKey && incomingAdminKey === adminKey)

        const result = {
            participants,
            hasDraw: !!drawResults.length,
            isAdmin,
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }

    }catch(err){
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false
            })
        }
    }

}

module.exports.draw = async (event) => {}