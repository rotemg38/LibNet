const Book = require("../models/Book");


module.exports = class BooksService{
    static async getAllCategories(){
        try {
            const categories = await Book.distinct('category').exec();
            return categories;
        } catch (error) {
            console.log(`Could not fetch books ${error}`)
        }
    }
    static async getAllLanguages(){
        try {
            const languages = await Book.distinct('language').exec();
            return languages;
        } catch (error) {
            console.log(`Could not fetch books ${error}`)
        }
    }
    static async getAllLocations(){
        try {
            const locations = await Book.distinct('location').exec();
            return locations;
        } catch (error) {
            console.log(`Could not fetch books ${error}`)
        }
    }

    static async getBooksByFilter(filter){
        try {
            
            const books = await Book.find(filter).exec();
            return books;
        } catch (error) {
            console.log(`Could not fetch books ${error}`)
        }
    }

    static async getAllBooks(){
        try {
            
            const books = await Book.find();
            return books;
        } catch (error) {
            console.log(`Could not fetch books ${error}`)
        }
    }
    
    static async getTop4NewBooks(){
        try {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();

            const top4Books = await Book.find({
                createdAt: {
                $gte: new Date(currentYear, currentMonth - 1, 1),
                $lt: new Date(currentYear, currentMonth, 1)
                }
            }).sort({ createdAt: -1 }).limit(4);

            return top4Books

        } catch (error) {
            console.log(`Could not fetch books ${error}`)
        }
    }

    static async createBook(data){
        try {
            let bookid = await Book.count();
            data["idBook"] = bookid + 1
            data["createdAt"] = Date.now()
            const newBook = JSON.parse(JSON.stringify(data));
            const response = await new Book(newBook).save();
            return response;
        } catch (error) {
            console.log(error);
        } 

    }
    static async getBookById(bookId){
        try {
            const book =  await Book.findOne({idBook: bookId});
            return book;
        } catch (error) {
            console.log(`Book not found. ${error}`)
        }
    }

    static async updateBook(bookId, data){
            try {
                const updatedBook = JSON.parse(JSON.stringify(data));
                const updateResponse =  await Book.updateOne({idBook: bookId}, updatedBook);
                return updateResponse;
            } catch (error) {
                console.log(`Could not update Book ${error}` );

        }
    }

    static async deleteBook(bookId){
        try {
            const deletedResponse = await Book.findOneAndDelete(bookId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete book ${error}`);
        }

    }
}