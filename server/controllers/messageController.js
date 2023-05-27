
const MessageService = require("../services/messageService");

module.exports = class Message{
   
   static async apiGetForumActivity(req, res, next){
      try {
        const activity = await MessageService.getForumActivity();
  
        if(!activity){
           res.status(404).json("No activity found!")
        }else{
          res.json(activity);
        }
        
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

    static async apiGetMessagesByFilter(req, res, next){
        try {
          const msgs = await MessageService.getMessagesByFilter(req.body);
          if(!msgs){
             res.status(404).json("No messages found!")
          }else{
             res.json(msgs);
          }
          
        } catch (error) {
           res.status(500).json({error: error})
        }
 
    }
    
    static async apiGetAllMessages(req, res, next){
       try {
         const msgs = await MessageService.getAllMessages();
         if(!msgs){
            res.status(404).json("No messages found!")
         }else{
            res.json(msgs);
         }
         
       } catch (error) {
          res.status(500).json({error: error})
       }
    }

    static async apiCreateMessage(req, res, next){
      try {
        const createdMsg =  await MessageService.createMessage(req.body);
        res.json(createdMsg);
      } catch (error) {
        res.status(500).json({error: error});
      }
    }

    static async apiUpdateMessage(req, res, next){
      try {

        let msgId = req.params.msgId || {};
        const updatedMsg = await MessageService.updateMessage(msgId,req.body);

         if(updatedMsg.modifiedCount === 0){
            throw new Error("Unable to update the message, error occord");
         }

         res.json(updatedMsg);

      } catch (error) {
         res.status(500).json({error: error});
      }
    }

    static async apiDeleteMessage(req, res, next){
         try {

            let msgId = req.params.msgId || {};
            const deleteResponse =  await MessageService.deleteMessage(msgId)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({error: error})
         }
    }

}
