const Forum = require("../models/Forum");

module.exports = class ForumService {

    static async getAllForums() {
        try {
            const data = await Forum.find();
            return data;
        } catch (error) {
            throw(`Could not fetch data ${error}`)
        }
    }
    static async getAllForumsWithDiscNum() {
        try {

            const data = await Forum.aggregate([
                {
                    $lookup: {
                        from: "discussions",
                        localField: "idForum",
                        foreignField: "idForum",
                        as: "discussions"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        forumName: 1,
                        idForum: 1,
                        description: 1,
                        createdAt: 1,
                        discussionsNum: { $sum: { $cond: [{ $isArray: "$discussions" }, { $size: "$discussions" }, 0] } } // calculate the number of messages in the messages array and store it in replies
                    }
                }
            ]);


            let result = data.sort((a, b) => (a.idForum > b.idForum) ? 1 : ((b.idForum > a.idForum) ? -1 : 0))
            return result;
        } catch (error) {
            throw(`Could not fetch data ${error}`)
        }
    }

    static async getForumByFilter(filter) {
        try {
            const data = await Forum.findOne(filter);
            return data;
        } catch (error) {
            throw(`Could not fetch data ${error}`)
        }
    }

    static async createForum(data) {
        try {
            data["createdAt"] = Date.now()
            let forumId = await Forum.count();
            data["idForum"] = forumId + 1

            const response = await new Forum(data).save();

            return response;
        } catch (error) {
            throw(error);
        }
    }

    static async updateForum(forumId, data) {
        try {
            const updatedData = JSON.parse(JSON.stringify(data));
            const updateResponse = await Forum.updateOne({ idForum: forumId }, updatedData);
            return updateResponse;
        } catch (error) {
            throw(`Could not update forum ${error}`);
        }
    }

    static async deleteForum(forumId) {
        try {
            const deletedResponse = await Forum.findOneAndDelete({ idForum: forumId });
            return deletedResponse;
        } catch (error) {
            throw(`Could not delete forum ${error}`);
        }
    }
}