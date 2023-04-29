
const RatingService = require("../services/ratingService");

module.exports = class BorrowBook{

    static async apiGetRatingUsersByFilter(req, res, next){
      try {
        const users = await RatingService.getRatingUsersByFilter(req.body);
  
        if(!users){
           res.status(404).json("No users found!")
        }else{
          res.json(users);
        }
        
      } catch (error) {
         res.status(500).json({error: error})
      }

    }

    static async apiGetRatingBooksByFilter(req, res, next){
        try {
          const books = await RatingService.getRatingBooksByFilter(req.body);
      
          if(!books){
             res.status(404).json("No books found!")
          }else{
            res.json(books);
          }
          
        } catch (error) {
           res.status(500).json({error: error})
        }
 
    }
    
    static async apiGetRatingByFilter(req, res, next){
        try {
          const ratings = await RatingService.getRatingByFilter(req.body);
          if(!ratings){
             res.status(404).json("No books found!")
          }else{
             res.json(ratings);
          }
          
        } catch (error) {
           res.status(500).json({error: error})
        }
 
    }

    static async apiGetAvgRateByBook(req, res, next){
        try {
            let id = req.params.bookId || {};
            const ratings = await RatingService.getAvgRateByBook(id);
            if(!ratings){
                res.status(404).json("No ratings found!")
            }else{
                res.json(ratings);
            }
          
        } catch (error) {
           res.status(500).json({error: error})
        }
 
    }
    static async apiGetTopRatedBooks(req, res, next){
        try {
            
            const ratings = await RatingService.getTopRatedBooks();
            if(!ratings){
                res.status(404).json("No ratings found!")
            }else{
                res.json(ratings);
            }
          
        } catch (error) {
           res.status(500).json({error: error})
        }
 
    }

    static async apiGetAllRatings(req, res, next){
       try {
         const ratings = await RatingService.getAllRatings();
         if(!ratings){
            res.status(404).json("No books found!")
         }else{
            res.json(ratings);
         }
         
       } catch (error) {
          res.status(500).json({error: error})
       }
    }

    static async apiCreateRating(req, res, next){
      try {
         const createdRate =  await RatingService.createRating(req.body);
         res.json(createdRate);
      } catch (error) {
         res.status(500).json({error: error});
      }
    }
   

    static async apiUpdateRating(req, res, next){
      try {

        let userId = req.params.userId || {};
        let bookId = req.params.bookId || {};
        const updatedRate = await RatingService.updateRating(bookId,userId,req.body);

         if(updatedRate.modifiedCount === 0){
            throw new Error("Unable to update borrowed book, error occord");
         }

         res.json(updatedRate);

      } catch (error) {
         res.status(500).json({error: error});
      }
    }

    static async apiDeleteRating(req, res, next){
         try {
            let userId = req.params.userId || {};
            let bookId = req.params.bookId || {};
            const deleteResponse =  await RatingService.deleteRating(bookId, userId)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({error: error})
         }
    }

}
