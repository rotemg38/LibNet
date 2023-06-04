
const RequestService = require("../services/requestService");

module.exports = class BorrowBook {


   static async apiGetRequestByFilter(req, res, next) {
      try {
         const requests = await RequestService.getRequestByFilter(req.body);
         if (!requests) {
            res.status(404).json("No requests found!")
         } else {
            res.json(requests);
         }

      } catch (error) {
         res.status(500).json({ error: error })
      }

   }


   static async apiGetAllRequests(req, res, next) {
      try {
         const requests = await RequestService.getAllRequests();
         if (!requests) {
            res.status(404).json("No requests found!")
         } else {
            res.json(requests);
         }

      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

   static async apiCreateRequest(req, res, next) {
      try {
         const createdReq = await RequestService.createRequest(req.body);
         res.json(createdReq);
      } catch (error) {
         res.status(500).json({ error: error });
      }
   }


   static async apiUpdateRequest(req, res, next) {
      try {

         let reqId = req.params.reqId || {};
         const updatedRequest = await RequestService.updateRequest(reqId, req.body);

         if (updatedRequest.modifiedCount === 0) {
            throw ("Unable to update the request, error occord");
         }

         res.json(updatedRequest);

      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async apiDeleteRequest(req, res, next) {
      try {

         let reqId = req.params.reqId || {};
         const deleteResponse = await RequestService.deleteRequest(reqId)
         res.json(deleteResponse);
      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

}
