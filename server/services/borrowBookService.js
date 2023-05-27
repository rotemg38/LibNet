const BorrowBook = require("../models/BorrowBook");

module.exports = class BorrowBooksService{

    static async getTopBorrowedBooks() {
        try{
            const results = await BorrowBook.aggregate([
            {
                $group: {
                _id: "$idBook",
                count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "idBook",
                as: "book"
                }
            },
            {
                $unwind: "$book"
            },
            {
                $project: {
                _id: 0,
                bookName: "$book.bookName",
                count: 1
                }
            }
            ]);
        
            return results;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }
      
   
    static async getBorrowUsersByFilter(filter){
        try {
            const aggr = [   
                {
                    $lookup: {
                        from: "users",
                        localField: "idUser",
                        foreignField: "idUser",
                        as: "user"
                    }
                },
                {   
                    $project:{
                        _id : 0,
                        idUser : 1,
                        idBook : 1,
                        status : 1,
                        dateBorrow : 1,
                        returnDate : 1,
                        firstName : { $arrayElemAt: ["$user.firstName", 0] },
                        lastName : { $arrayElemAt: ["$user.lastName", 0] },
                        mail : { $arrayElemAt: ["$user.mail", 0] }
                        
                    } 
                }
            ]
           
            const data = await BorrowBook.aggregate(aggr);
            
            let result = []
            //loop over results and filter them according to the given filter
            data.map((element)=>{
                let flag = true;
                for (const [key, value] of Object.entries(filter)) {
                    if(String(element[key]) !== String(value)){
                        flag = false
                    }
                }
                
                if(flag)
                    result.push(element)
            })
            
            return result;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    static async getBorrowBooksByFilter(filter){
        try {
            const aggr = [   
                {
                    $lookup: {
                        from: "books",
                        localField: "idBook",
                        foreignField: "idBook",
                        as: "book"
                    }
                },
                {   
                    $project:{
                        _id : 0,
                        idUser : 1,
                        idBook : 1,
                        status : 1,
                        dateBorrow : 1,
                        returnDate : 1,
                        bookName : { $arrayElemAt: ["$book.bookName", 0] },
                        author : { $arrayElemAt: ["$book.author", 0] },
                        copyAvailable : { $arrayElemAt: ["$book.copyAvailable", 0] }
                    } 
                }
            ]
           
            const data = await BorrowBook.aggregate(aggr);
            
            let result = []
            //loop over results and filter them according to the given filter
            data.map((element)=>{
                let flag = true;
                for (const [key, value] of Object.entries(filter)) {
                    if(String(element[key]) !== String(value)){
                        flag = false
                    }
                }
                
                if(flag)
                    result.push(element)
            })
            
            return result;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    static async getLateUsersBorrows(){
        try {
            const lastDate = new Date();
            lastDate.setMonth(lastDate.getMonth()-1);

            const aggr = [   
                {
                    $lookup: {
                        from: "users",
                        localField: "idUser",
                        foreignField: "idUser",
                        as: "user"
                    }
                },
                {
                    $lookup: {
                        from: "books",
                        localField: "idBook",
                        foreignField: "idBook",
                        as: "book"
                    }
                },
                {
                    $match:{
                        dateBorrow : {$lt: lastDate},
                        status: "borrowed"
                    }
                },
                {   
                    $project:{
                        _id : 0,
                        idUser : 1,
                        idBook : 1,
                        status : 1,
                        dateBorrow : 1,
                        returnDate : 1,
                        firstName : { $arrayElemAt: ["$user.firstName", 0] },
                        lastName : { $arrayElemAt: ["$user.lastName", 0] },
                        mail : { $arrayElemAt: ["$user.mail", 0] },
                        bookName : { $arrayElemAt: ["$book.bookName", 0] }
                        
                    } 
                }
            ]
           
            const data = await BorrowBook.aggregate(aggr);        
            
            return data;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    static async getAllBorrowBooks(){
        try {
            const data = await BorrowBook.find();
            return data;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
    }

    static async createBorrowBook(data){
        try {
            let borrowBooks = []
            data.forEach(d => {
                d["dateBorrow"] = Date.now()
                d["returnDate"] = null
                d["numLong"] = 0
                d["status"] = "borrowed"
                borrowBooks.push(d)
            });
            
            const response = await BorrowBook.insertMany(borrowBooks);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async updateBorrowBook(bookId, userId, data){
            try {
                const updatedData= JSON.parse(JSON.stringify(data));
                const updateResponse =  await BorrowBook.updateOne({idBook: bookId, idUser: userId}, updatedData);
                return updateResponse;
            } catch (error) {
                console.log(`Could not update Borrowed Book ${error}` );
        }
    }

    static async updateReturnBook(bookId, userId, dateBorrow){
        //update arrive date to the first user in line
        try {
            const data = await BorrowBook.findOneAndUpdate(
                {idUser: userId, idBook: bookId, status: "borrowed", dateBorrow: dateBorrow},
                { $set: { status: "returned", returnDate: Date.now() } }
            );
            return data;
        } catch (error) {
            console.log(`Could not fetch data ${error}`)
        }
          
    }

    static async deleteBorrowBook(bookId, userId){
        try {
            const deletedResponse = await BorrowBook.findOneAndDelete({idBook: bookId, idUser: userId});
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete book ${error}`);
        }
    }
}