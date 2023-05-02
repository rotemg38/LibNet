const Discussion = require("../models/Discussion");

module.exports = class DiscussionService{
   
    static async getAllDiscussions(){
        try {
            const data = await Discussion.find();
            return data;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    static async getDiscussionsByFilter(filter){
        try {
            const data = await Discussion.find(filter);
            return data;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    static async getDiscussionsByForumWithReplies(forumId){
        try {
            
            const data = await Discussion.aggregate([
                
                {
                  $lookup: {
                    from: "messages",
                    localField: "idDisc",
                    foreignField: "idDisc",
                    as: "messages" // join the messages collection using the idDisc field and store the result in an array called messages
                  }
                },
                {
                  $group: {
                    _id: "$idDisc",
                    idDisc: { $first: "$idDisc" },
                    idForum: { $first: "$idForum" },
                    idUserOwner: { $first: "$idUserOwner" },
                    discName: { $first: "$discName" },
                    createdAt: { $first: "$createdAt" },
                    seenNum: { $first: "$seenNum" },
                    replies: { $sum: { $cond: [{ $isArray: "$messages" }, { $size: "$messages" }, 0] } } // calculate the number of messages in the messages array and store it in replies
                  }
                }
            ]);
            
            let result = []
            //loop over results and filter them according to the given filter
            data.map((element)=>{
                let flag = true;
                
                if(String(element["idForum"]) !== String(forumId)){
                    flag = false
                }
                
                if(flag)
                    result.push(element)
            })
            
            result = result.sort((a,b) => (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : ((new Date(b.createdAt) > new Date(a.createdAt)) ? 1 : 0))
            return result;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    

    static async createDiscussion(data){
        try {
            data["createdAt"] = Date.now()
            let discussionId = await Discussion.count();
            data["idDisc"] = discussionId + 1
            data["seenNum"] = 1
            
            const response = await new Discussion(data).save();

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async updateDiscussion(discussionId, data){
        try {
            const updatedData= JSON.parse(JSON.stringify(data));
            const updateResponse =  await Discussion.updateOne({idDisc: discussionId}, updatedData);
            return updateResponse;
        } catch (error) {
            console.log(`Could not update discussion ${error}` );
        }
    }

    static async deleteDiscussion(discussionId){
        try {
            const deletedResponse = await Discussion.findOneAndDelete({idDisc: discussionId});
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete discussion ${error}`);
        }
    }
}