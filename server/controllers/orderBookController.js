
const OrderBooksService = require("../services/orderBookService");

module.exports = class OrderBook {
   
   static async apiGetOrderUsersByFilter(req, res, next){
      try {
        const books = await OrderBooksService.getOrderUsersByFilter(req.body);
  
        if(!books){
           res.status(404).json("No users found!")
        }else{
          res.json(books);
        }
        
      } catch (error) {
         res.status(500).json({error: error})
      }

  }

    static async apiGetOrderBooksByFilter(req, res, next){
        try {
          const books = await OrderBooksService.getOredrBooksByFilter(req.body);
         
          if(!books){
             res.status(404).json("No books found!")
          }else{
            res.json(books);
          }
          
        } catch (error) {
           res.status(500).json({error: error})
        }
 
    }
    

   static async apiGetAllOrderBooks(req, res, next){
       try {
         const books = await OrderBooksService.getAllOrderBooks();
         if(!books){
            res.status(404).json("No books found!")
         }else{
            res.json(books);
         }
         
       } catch (error) {
          res.status(500).json({error: error})
       }

   }

   static async apiCreateOrderBook(req, res, next){
      try {
         const createdBook =  await OrderBooksService.createOrderBook(req.body);
         res.json(createdBook);
      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiUpdateOrderBook(req, res, next){
      try {

        let userId = req.params.userId || {};
        let bookId = req.params.bookId || {};
        const updatedBook = await OrderBooksService.updateOrderBook(bookId,userId,req.body);

         if(updatedBook.modifiedCount === 0){
            throw new Error("Unable to update borrowed book, error occord");
         }

         res.json(updatedBook);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiUpdateUserArriveBook(req, res, next){
      try {
        let bookId = req.params.bookId || {};
        const updatedBook = await OrderBooksService.updateUserArriveBook(bookId);

         if(updatedBook.modifiedCount === 0){
            throw new Error("Unable to update ordered book, error occord");
         }

         res.json(updatedBook);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiDeleteOrderBook(req, res, next){
         try {
            let userId = req.params.userId || {};
            let bookId = req.params.bookId || {};
            const deleteResponse =  await OrderBooksService.deleteOrderBook(bookId, userId)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({error: error})
         }
   }

}
