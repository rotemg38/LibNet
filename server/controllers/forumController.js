
const ForumService = require("../services/forumService");

module.exports = class Forum{
   
    static async apiGetForumByFilter(req, res, next){
        try {
          const forums = await ForumService.getForumByFilter(req.body);
          if(!forums){
             res.status(404).json("No forums found!")
          }else{
             res.json(forums);
          }
          
        } catch (error) {
           res.status(500).json({error: error})
        }
 
    }
    
    static async apiGetAllForumsWithDiscNum(req, res, next){
        try {
          const forums = await ForumService.getAllForumsWithDiscNum();
          if(!forums){
             res.status(404).json("No forums found!")
          }else{
             res.json(forums);
          }
          
        } catch (error) {
           res.status(500).json({error: error})
        }
     }

    static async apiGetAllForums(req, res, next){
       try {
         const forums = await ForumService.getAllForums();
         if(!forums){
            res.status(404).json("No forums found!")
         }else{
            res.json(forums);
         }
         
       } catch (error) {
          res.status(500).json({error: error})
       }
    }

    static async apiCreateForum(req, res, next){
      try {
        const createdForum =  await ForumService.createForum(req.body);
        res.json(createdForum);
      } catch (error) {
        res.status(500).json({error: error});
      }
    }

    static async apiUpdateForum(req, res, next){
      try {

        let forumId = req.params.forumId || {};
        const updatedForum = await ForumService.updateForum(forumId,req.body);

         if(updatedForum.modifiedCount === 0){
            throw new Error("Unable to update the forum, error occord");
         }

         res.json(updatedForum);

      } catch (error) {
         res.status(500).json({error: error});
      }
    }


    static async apiDeleteForum(req, res, next){
         try {

            let forumId = req.params.forumId || {};
            const deleteResponse =  await ForumService.deleteForum(forumId)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({error: error})
         }
    }

}
