
const UserService = require("../services/userService");

const jwt = require("jsonwebtoken");

module.exports = class User{

    static async apiUpdatePassUser(req, res, next){
        try {
            let id = req.params.id || {};
            const filter = {"password": req.body["pre"], idUser: id}
            
            const user = await UserService.getUsersByFilter(filter);
            
            if(!user || user.length === 0){
                res.status(404).json("User Not Found!")
            }else{
                const updatedUser = await UserService.updateUser(id,{"password": req.body["new"]});
                if(updatedUser.modifiedCount === 0){
                    throw new Error("Unable to update user, error occord");
                }
                
                res.json("password updated!");
            }
                
        } catch (error) {
            res.status(500).json({error: error})
        }
 
    }

    static async apiSignInUser(req, res, next){
        try {
            
            const user = await UserService.getUsersByFilter(req.body);
            
            if(!user){
                res.status(404).json("User Not Found!")
            }else{
               const token = jwt.sign({ userId: user[0]["_id"]}, "z6rbpHQyB%VmaU#sT@!nGdLZ*8aPx&Kj");
               res.json({ "token":token, "userId": user[0]["idUser"], "admin": user[0]["isAdmin"], "firstName": user[0]["firstName"] });
               
            }
            
        } catch (error) {
            res.status(500).json({error: error})
        }
 
    }

    static async apiGetUsersByFilter(req, res, next){
        try {
            
          const users = await UserService.getUsersByFilter(req.body);
          if(!users){
             res.status(404).json("There are no users yet!")
          }else{
            res.json(users);
          }
          
        } catch (error) {
           res.status(500).json({error: error})
        }
 
    }
    

   static async apiGetAllUsers(req, res, next){
       try {
         const users = await UserService.getAllUsers();
         if(!users){
            res.status(404).json("There are no users yet!")
         }else{
            res.json(users);
         }
         
       } catch (error) {
          res.status(500).json({error: error})
       }

   }

   static async apiGetUserById(req, res, next){
      try {
         let id = req.params.id || {};
         const user = await UserService.getUserById(id);
         res.json(user);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

   static async apiCreateUser(req, res, next){
      try {
         const createdUser =  await UserService.createUser(req.body);
         res.json(createdUser);
      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiUpdateUser(req, res, next){
      try {

        let id = req.params.id || {};

        const updatedUser = await UserService.updateUser(id,req.body);

         if(updatedUser.modifiedCount === 0){
            throw new Error("Unable to update user, error occord");
         }

         res.json("user updated!");

      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiDeleteUser(req, res, next){
         try {
            let id = req.params.id || {};
            const deleteResponse =  await UserService.deleteUser(id)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({error: error})
         }
   }

}
