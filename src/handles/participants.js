const { v4: uuidv4} = require('uuid')
require('../resources/db/connection')()

const secretModel = require('../resources/db/models/Secret')


module.exports.create = async(event, context) => {

    context.callbackWaitForEmpyEventLoop = false

    const { id: secretId } = event.pathParameters
    const { name, email } = JSON.parse(event.body)
    const externalId = uuidv4()

    try{    
        const resulr = await secretModel.updateOne({
            externalId: secretId,
            'participants.email': { $ne: email}
        }, 
        {
            $push: {
                participants: {
                    externalId, 
                    name, 
                    email
                }
            }
        })

    if(!resulr.nModified){
        throw new Error()
    }

    return {
        statusCode: 201,
        body: JSON.stringify({
            success: true,
            id: externalId,
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

module.exports.delete = async(event, context) => {

    context.callbackWaitForEmpyEventLoop = false

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