const User = require("../models/User");


module.exports = class UserService{

    static async getGroupByAges(){
        try {
            const agg = [
                {
                  $group: {
                    _id: {
                      $switch: {
                        branches: [
                          { case: { $lte: ["$age", 18] }, then: "0-18" },
                          { case: { $lte: ["$age", 25] }, then: "18-25" },
                          { case: { $lte: ["$age", 32] }, then: "25-32" },
                          { case: { $lte: ["$age", 50] }, then: "32-50" },
                          { case: { $gt: ["$age", 50] }, then: "50-max" }
                        ],
                        default: "Unknown"
                      }
                    },
                    count: { $sum: 1 }
                  }
                },
                {
                  $sort: {
                    _id: 1
                  }
                }
            ]
            const users = await User.aggregate(agg)
            return users;
        } catch (error) {
            console.log(`Could not fetch users ${error}`)
        }
    }

    static async getUsersByFilter(filter){
        try {
            let userProjection = { 
                _id: false,
                password: false
            };
            const users = await User.find(filter, userProjection).exec();
            return users;
        } catch (error) {
            console.log(`Could not fetch users ${error}`)
        }
    }

    static async getAllUsers(){
        try {
            let userProjection = { 
                _id: false,
                password: false
            };
            const users = await User.find({}, userProjection).exec();
            return users;
        } catch (error) {
            console.log(`Could not fetch users ${error}`)
        }
    }

    static async createUser(data){
        try {
            data["isAdmin"] = false
            data["limitBooks"] = 2
            data["createdAt"] = Date.now()
            
            let userid = await User.count();
            data["idUser"] = userid + 1
            const newUser = JSON.parse(JSON.stringify(data));
            const response = await new User(newUser).save();
            return response;
        } catch (error) {
            console.log(error);
        } 

    }
    static async getUserById(userId){
        try {
            let userProjection = { 
                _id: false,
                password: false
            };
            const user =  await User.findOne({idUser: userId}, userProjection);
            return user;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }

    static async updateUser(userId, data){
            try {
                const updatedUser = JSON.parse(JSON.stringify(data));
                const updateResponse =  await User.updateOne({idUser: userId}, updatedUser);
                return updateResponse;
            } catch (error) {
                console.log(`Could not update User ${error}` );

        }
    }

    static async deleteUser(userId){
        try {
            const deletedResponse = await User.findOneAndDelete(userId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete book ${error}`);
        }

    }
}