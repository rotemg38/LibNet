const Rating = require("../models/Rating");

module.exports = class RatingService {

    static async getRatingUsersByFilter(filter) {
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
                    $project: {
                        _id: 0,
                        idUser: 1,
                        idBook: 1,
                        createdAt: 1,
                        rateNum: 1,
                        firstName: { $arrayElemAt: ["$user.firstName", 0] },
                        lastName: { $arrayElemAt: ["$user.lastName", 0] },
                        mail: { $arrayElemAt: ["$user.mail", 0] }

                    }
                }
            ]

            const data = await Rating.aggregate(aggr);

            let result = []
            //loop over results and filter them according to the given filter
            data.map((element) => {
                let flag = true;
                for (const [key, value] of Object.entries(filter)) {
                    if (String(element[key]) !== String(value)) {
                        flag = false
                    }
                }

                if (flag)
                    result.push(element)
            })

            return result;
        } catch (error) {
            throw(`Could not fetch data ${error}`)
        }
    }

    static async getRatingBooksByFilter(filter) {
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
                    $project: {
                        _id: 0,
                        idUser: 1,
                        idBook: 1,
                        createdAt: 1,
                        rateNum: 1,
                        bookName: { $arrayElemAt: ["$book.bookName", 0] },
                        author: { $arrayElemAt: ["$book.author", 0] },
                        copyAvailable: { $arrayElemAt: ["$book.copyAvailable", 0] }
                    }
                }
            ]

            const data = await Rating.aggregate(aggr);

            let result = []
            //loop over results and filter them according to the given filter
            data.map((element) => {
                let flag = true;
                for (const [key, value] of Object.entries(filter)) {
                    if (String(element[key]) !== String(value)) {
                        flag = false
                    }
                }

                if (flag)
                    result.push(element)
            })

            return result;
        } catch (error) {
            throw(`Could not fetch data ${error}`)
        }
    }

    static async getAllRatings() {
        try {
            const data = await Rating.find();
            return data;
        } catch (error) {
            throw(`Could not fetch data ${error}`)
        }
    }

    static async getRatingByFilter(filter) {
        try {
            const data = await Rating.findOne(filter);
            return data;
        } catch (error) {
            throw(`Could not fetch data ${error}`)
        }
    }

    static async getAvgRateByBook(bookId) {
        try {
            const data = await Rating.aggregate([
                { $group: { _id: "$idBook", avgRating: { $avg: "$rateNum" } } },
                { $match: { _id: parseInt(bookId) } },
                { $project: { _id: 0, avgRating: 1 } }
            ]);

            return data[0];
        } catch (error) {
            throw(`Could not fetch data ${error}`)
        }
    }

    static async getTopRatedBooks() {
        try {
            const result = await Rating.aggregate([
                {
                    $group: {
                        _id: '$idBook',
                        averageRating: { $avg: '$rateNum' }
                    }
                },
                {
                    $lookup: {
                        from: 'books',
                        localField: '_id',
                        foreignField: 'idBook',
                        as: 'book'
                    }
                },
                {
                    $unwind: '$book'
                },
                {
                    $project: {
                        _id: 0,
                        bookName: '$book.bookName',
                        author: '$book.author',
                        averageRating: 1
                    }
                },
                {
                    $sort: {
                        averageRating: -1
                    }
                },
                {
                    $limit: 5
                }
            ]);

            return result;
        } catch (error) {
            throw(`Could not fetch data ${error}`)
        }

    }

    static async createRating(data) {
        try {
            data["createdAt"] = Date.now()
            const response = await new Rating(data).save();

            return response;
        } catch (error) {
            throw(error);
        }
    }

    static async updateRating(bookId, userId, data) {
        try {
            const updatedData = JSON.parse(JSON.stringify(data));
            const updateResponse = await Rating.updateOne({ idBook: bookId, idUser: userId }, updatedData);
            return updateResponse;
        } catch (error) {
            throw(`Could not update Borrowed Book ${error}`);
        }
    }

    static async deleteRating(bookId, userId) {
        try {
            const deletedResponse = await Rating.findOneAndDelete({ idBook: bookId, idUser: userId });
            return deletedResponse;
        } catch (error) {
            throw(`Could not delete book ${error}`);
        }
    }
}