
const BooksService = require("../services/booksService");

module.exports = class Book {

   static async apiGetLocations(req, res, next) {
      try {
         const locations = await BooksService.getAllLocations();
         if (!locations) {
            res.status(404).json("There are no books yet!")
         } else {
            res.json(locations);
         }

      } catch (error) {
         res.status(500).json({ error: error })
      }

   }

   static async apiGetLanguages(req, res, next) {
      try {
         const languages = await BooksService.getAllLanguages();
         if (!languages) {
            res.status(404).json("There are no books yet!")
         } else {
            res.json(languages);
         }

      } catch (error) {
         res.status(500).json({ error: error })
      }

   }

   static async apiGetCategories(req, res, next) {
      try {
         const categories = await BooksService.getAllCategories();
         if (!categories) {
            res.status(404).json("There are no books yet!")
         } else {
            res.json(categories);
         }

      } catch (error) {
         res.status(500).json({ error: error })
      }

   }

   static async apiGetBooksByFilter(req, res, next) {
      try {
         const books = await BooksService.getBooksByFilter(req.body);
         if (!books) {
            res.status(404).json("There are no books yet!")
         } else {
            res.json(books);
         }

      } catch (error) {
         res.status(500).json({ error: error })
      }

   }


   static async apiGetAllBooks(req, res, next) {
      try {
         const books = await BooksService.getAllBooks();
         if (!books) {
            res.status(404).json("There are no books yet!")
         } else {
            res.json(books);
         }

      } catch (error) {
         res.status(500).json({ error: error })
      }

   }

   static async apiGetBookById(req, res, next) {
      try {
         let id = req.params.id || {};
         const book = await BooksService.getBookById(id);
         res.json(book);
      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

   static async apiGetTop4NewBooks(req, res, next) {
      try {

         const book = await BooksService.getTop4NewBooks();
         res.json(book);
      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

   static async apiCreateBook(req, res, next) {
      try {
         const createdBook = await BooksService.createBook(req.body);
         res.json(createdBook);
      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async apiUpdateBook(req, res, next) {
      try {

         let id = req.params.id || {};
         const updatedBook = await BooksService.updateBook(id, req.body);

         if (updatedBook.modifiedCount === 0) {
            throw new Error("Unable to update book, error occord");
         }

         res.json(updatedBook);

      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async apiDeleteBook(req, res, next) {
      try {
         let id = req.params.id || {};
         const deleteResponse = await BooksService.deleteBook(id)
         res.json(deleteResponse);
      } catch (error) {
         res.status(500).json({ error: error })
      }
   }

}
