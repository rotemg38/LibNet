const Request = require("../models/Request");

module.exports = class RequestService {


    static async getAllRequests() {
        try {
            const data = await Request.find();
            return data;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    static async getRequestByFilter(filter) {
        try {
            const data = await Request.findOne(filter);
            return data;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    static async createRequest(data) {
        try {
            data["createdAt"] = Date.now()
            let reqId = await Request.count();
            data["idReq"] = reqId + 1
            data["seen"] = false

            const response = await new Request(data).save();

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async updateRequest(reqId, data) {
        try {
            const updatedData = JSON.parse(JSON.stringify(data));
            const updateResponse = await Request.updateOne({ idReq: reqId }, updatedData);
            return updateResponse;
        } catch (error) {
            console.log(`Could not update request ${error}`);
        }
    }

    static async deleteRequest(reqId) {
        try {
            const deletedResponse = await Request.findOneAndDelete({ idReq: reqId });
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete request ${error}`);
        }
    }
}