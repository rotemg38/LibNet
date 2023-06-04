const User = require("../models/User");


module.exports = class UserService {

    static async getGroupByAges() {
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
            throw (`Could not fetch users ${error}`)
        }
    }

    static async getUsersByFilter(filter) {
        try {
            let userProjection = {
                _id: false,
                password: false
            };
            const users = await User.find(filter, userProjection);
            return users;
        } catch (error) {
            throw (`Could not fetch users ${error}`)
        }
    }

    static async getAllUsers() {
        try {
            let userProjection = {
                _id: false,
                password: false
            };
            const users = await User.find({}, userProjection);
            return users;
        } catch (error) {
            throw (`Could not fetch users ${error}`)
        }
    }

    static async createUser(data) {
        try {
            data["isAdmin"] = false
            data["limitBooks"] = 2
            data["createdAt"] = Date.now()

            let userid = await User.count();
            data["idUser"] = userid + 1
            const newUser = JSON.parse(JSON.stringify(data));
            //const response = await new User(newUser).save();
            const response = await User.create(newUser);
            return response;
        } catch (error) {
            throw (error);
        }

    }
    static async getUserById(userId) {
        try {
            let userProjection = {
                _id: false,
                password: false
            };
            const user = await User.findOne({ idUser: userId }, userProjection);
            return user;
        } catch (error) {
            throw (`User not found. ${error}`)
        }
    }

    static async updateUser(userId, data) {
        try {
            const updatedUser = JSON.parse(JSON.stringify(data));
            const updateResponse = await User.updateOne({ idUser: userId }, updatedUser);
            return updateResponse;
        } catch (error) {
            throw (`Could not update user ${error}`);

        }
    }

    static async deleteUser(userId) {
        try {
            const deletedResponse = await User.findOneAndDelete(userId);
            return deletedResponse;
        } catch (error) {
            throw (`Could not delete user ${error}`);
        }

    }
}