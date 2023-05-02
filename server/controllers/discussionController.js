
const DiscussionService = require("../services/discussionService");

module.exports = class Discussion{
   
    static async apiGetDiscussionsByFilter(req, res, next){
        try {
          const discussions = await DiscussionService.getDiscussionsByFilter(req.body);
          if(!discussions){
             res.status(404).json("No discussions found!")
          }else{
             res.json(discussions);
          }
          
        } catch (error) {
           res.status(500).json({error: error})
        }
 
    }
    
    static async apiGetAllDiscussions(req, res, next){
       try {
            const discussions = await DiscussionService.getAllDiscussions();
            if(!discussions){
                res.status(404).json("No discussions found!")
            }else{
                res.json(discussions);
            }
         
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async apiCreateDiscussion(req, res, next){
      try {
        const createdDisc =  await DiscussionService.createDiscussion(req.body);
        res.json(createdDisc);
      } catch (error) {
        res.status(500).json({error: error});
      }
    }
    
    static async apiGetDiscussionsByForumWithReplies(req, res, next){
        try {
  
          let forumId = req.params.forumId || {};
          const discussions = await DiscussionService.getDiscussionsByForumWithReplies(forumId);
          if(!discussions){
            res.status(404).json("No discussions found!")
          }else{
            res.json(discussions);
          }

        } catch (error) {
           res.status(500).json({error: error});
        }
    }

    static async apiUpdateDiscussion(req, res, next){
      try {

        let discId = req.params.discId || {};
        const updatedDiscussions = await DiscussionService.updateDiscussion(discId,req.body);

        if(updatedDiscussions.modifiedCount === 0){
            throw new Error("Unable to update the discussion, error occord");
        }

        res.json(updatedDiscussions);

      } catch (error) {
         res.status(500).json({error: error});
      }
    }

    static async apiDeleteDiscussion(req, res, next){
        try {

            let discId = req.params.discId || {};
            const deleteResponse =  await DiscussionService.deleteDiscussion(discId)
            res.json(deleteResponse);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

}
