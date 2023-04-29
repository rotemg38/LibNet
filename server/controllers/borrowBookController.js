
const BorrowBooksService = require("../services/borrowBookService");

module.exports = class BorrowBook{

   static async apiGetTopBorrowedBooks(req, res, next){
      try {
        const books = await BorrowBooksService.getTopBorrowedBooks();
  
        if(!books){
           res.status(404).json("No books found!")
        }else{
          res.json(books);
        }
        
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

   static async apiGetBorrowUsersByFilter(req, res, next){
      try {
        const users = await BorrowBooksService.getBorrowUsersByFilter(req.body);
  
        if(!users){
           res.status(404).json("No users found!")
        }else{
          res.json(users);
        }
        
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

   static async apiGetBorrowBooksByFilter(req, res, next){
      try {
         const books = await BorrowBooksService.getBorrowBooksByFilter(req.body);
   
         if(!books){
            res.status(404).json("No books found!")
         }else{
         res.json(books);
         }
         
      } catch (error) {
         res.status(500).json({error: error})
      }

   }

   static async apiGetLateUsersBorrows(req, res, next){
      try {
         const users = await BorrowBooksService.getLateUsersBorrows(req.body);
   
         if(!users){
            res.status(404).json("No users found!")
         }else{
         res.json(users);
         }
         
      } catch (error) {
         res.status(500).json({error: error})
      }

   }
    

   static async apiGetAllBorrowBooks(req, res, next){
       try {
         const books = await BorrowBooksService.getAllBorrowBooks();
         if(!books){
            res.status(404).json("No books found!")
         }else{
            res.json(books);
         }
         
       } catch (error) {
          res.status(500).json({error: error})
       }

   }

   static async apiCreateBorrowBook(req, res, next){
      try {
         const createdBook =  await BorrowBooksService.createBorrowBook(req.body);
         res.json(createdBook);
      } catch (error) {
         res.status(500).json({error: error});
      }
   }
   static async apiUpdateReturnBook(req, res, next){
      try {

        let userId = req.params.userId || {};
        let bookId = req.params.bookId || {};
        let dateBorrow = req.params.dateBorrow || {};
        const updatedBook = await BorrowBooksService.updateReturnBook(bookId,userId,dateBorrow);

         if(updatedBook.modifiedCount === 0){
            throw new Error("Unable to update borrowed book, error occord");
         }

         res.json(updatedBook);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiUpdateBorrowBook(req, res, next){
      try {

        let userId = req.params.userId || {};
        let bookId = req.params.bookId || {};
        const updatedBook = await BorrowBooksService.updateBorrowBook(bookId,userId,req.body);

         if(updatedBook.modifiedCount === 0){
            throw new Error("Unable to update borrowed book, error occord");
         }

         res.json(updatedBook);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiDeleteBorrowBook(req, res, next){
         try {
            let userId = req.params.userId || {};
            let bookId = req.params.bookId || {};
            const deleteResponse =  await BorrowBooksService.deleteBorrowBook(bookId, userId)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({error: error})
         }
   }

}
