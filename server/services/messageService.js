const Message = require("../models/Message");

module.exports = class MessageService{
   
    static async getAllMessages(){
        try {
            const data = await Message.find();
            return data;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    static async getMessagesByFilter(filter){
        try {
            const data = await Message.find(filter);
            return data;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    static async createMessage(data){
        try {
            data["createdAt"] = Date.now()
            let msgId = await Message.count();
            data["idMsg"] = msgId + 1
            
            const response = await new Message(data).save();
            
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async updateMessage(msgId, data){
            try {
                const updatedData= JSON.parse(JSON.stringify(data));
                const updateResponse =  await Message.updateOne({idMsg: msgId}, updatedData);
                return updateResponse;
            } catch (error) {
                console.log(`Could not update message ${error}` );
        }
    }

    static async deleteMessage(msgId){
        try {
            const deletedResponse = await Message.findOneAndDelete({idMsg: msgId});
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete message ${error}`);
        }
    }
}