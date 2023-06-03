const OrderBook = require("../models/OrderBook");

module.exports = class OrderBooksService {

    static async updateUserArriveBook(bookId) {
        //update arrive date to the first user in line
        try {
            const data = await OrderBook.findOneAndUpdate(
                { idBook: bookId, status: "waiting", dateArrive: null },
                { $set: { dateArrive: Date.now() } },
                { sort: { dateInv: 1 }, new: true }
            );
            return data;
        } catch (error) {
            throw (`Could not fetch data ${error}`)
        }

    }

    static async getOrderUsersByFilter(filter) {
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
                        status: 1,
                        dateInv: 1,
                        dateArrive: 1,
                        firstName: { $arrayElemAt: ["$user.firstName", 0] },
                        lastName: { $arrayElemAt: ["$user.lastName", 0] },
                        mail: { $arrayElemAt: ["$user.mail", 0] }

                    }
                }
            ]

            const data = await OrderBook.aggregate(aggr);

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
            throw (`Could not fetch data ${error}`)
        }
    }

    static async getOredrBooksByFilter(filter) {
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
                        status: 1,
                        dateInv: 1,
                        dateArrive: 1,
                        bookName: { $arrayElemAt: ["$book.bookName", 0] },
                        author: { $arrayElemAt: ["$book.author", 0] }
                    }
                }
            ]

            const data = await OrderBook.aggregate(aggr);

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
            throw (`Could not fetch data ${error}`)
        }
    }

    static async getAllOrderBooks() {
        try {
            const data = await OrderBook.find();
            return data;
        } catch (error) {
            throw (`Could not fetch data ${error}`)
        }
    }

    static async createOrderBook(data) {
        try {
            let orderBooks = []
            data.forEach(d => {
                d["dateInv"] = Date.now()
                d["dateArrive"] = null
                d["status"] = "waiting"
                orderBooks.push(d)
            });

            const response = await OrderBook.insertMany(orderBooks);

            return response;
        } catch (error) {
            throw (error);
        }
    }

    static async updateOrderBook(bookId, userId, data) {
        try {
            var filter = {}
            if (data.filter !== undefined) {
                filter = data.filter
                delete data.filter
            }

            filter["idBook"] = bookId
            filter["idUser"] = userId
            console.log(filter)

            const updatedData = JSON.parse(JSON.stringify(data));
            console.log(updatedData)
            const updateResponse = await OrderBook.updateOne(filter, updatedData);

            return updateResponse;
        } catch (error) {
            throw (`Could not update ordered book ${error}`);
        }
    }

    static async deleteOrderBook(bookId, userId) {
        try {
            const deletedResponse = await OrderBook.findOneAndDelete({ idBook: bookId, idUser: userId });
            return deletedResponse;
        } catch (error) {
            throw (`Could not delete book ${error}`);
        }
    }
}