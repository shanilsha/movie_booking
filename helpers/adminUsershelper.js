var db = require('../config/connection')
var collection = require('../config/collection')

module.exports={

    addUsers:(owner,callback)=>{
        
        db.get().collection('owner').insertOne(owner).then((data)=>{

            callback(data.ops[0]._id)

        })
    },
    getAllOwners:()=>{
        return new Promise(async(resolve,reject)=>{
            let owners=await db.get().collection(collection.OWNER_COLLECTION).find().toArray()
            resolve(owners)
        })
    }

    
}