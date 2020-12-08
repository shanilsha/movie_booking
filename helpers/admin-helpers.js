var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt')
module.exports = {

    


    doLogin: (adminData) => {
        
        return new Promise(async (resolve, reject) => {

            let loginStatus = false
            let response = {}
            let admin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({ Email: adminData.email, Password: adminData.password })
            if (admin) {
                console.log("login sucess")
                response.admin = admin
                response.status = true
                resolve(response)
            } else{
                console.log('login failed')
                response.status =false;
                resolve(response)

            }

        })}

       

    }


    



