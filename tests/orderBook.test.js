const request = require('supertest');
const express = require('express')
const bodyParser = require('body-parser');

const { expect, test, describe } = require('@jest/globals');

// Import the router
const router = require('../server/routes/orderBookRouter');

const OrderBook = require('../server/models/OrderBook');

const endpoint = '/api/orderBooks'

// Create an express app and use the router
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(endpoint, router);


describe('Tests For: apiGetAllOrderBooks', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get all OrderBooks', async () => {
    const mockGetAllOrderBooks = jest.fn(() => ['OrderBook1', 'OrderBook2'])

    // Mock the controller function
    jest.spyOn(OrderBook, "find").mockImplementation(() => mockGetAllOrderBooks())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/');

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(['OrderBook1', 'OrderBook2']);
    expect(mockGetAllOrderBooks).toHaveBeenCalledTimes(1);
  });

  test('Test get null', async () => {
    const mockGetAllOrderBooks = jest.fn(() => { null })

    // Mock the controller function
    jest.spyOn(OrderBook, "find").mockImplementation(() => mockGetAllOrderBooks())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/');

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("No books found!");
    expect(mockGetAllOrderBooks).toHaveBeenCalledTimes(1);
  });

  test('Test get exception', async () => {
    const mockGetAllOrderBooks = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(OrderBook, "find").mockImplementation(() => mockGetAllOrderBooks())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/');

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch data mock error" });
    expect(mockGetAllOrderBooks).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiUpdateOrderBook', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });

  test('Test update OrderBook success', async () => {
    const mockUpdateOrderBook = jest.fn(() => { return { "modifiedCount": 1 } })

    // Mock the controller function
    jest.spyOn(OrderBook, "updateOne").mockImplementation(() => mockUpdateOrderBook())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/OrderBook/${1}/${1}`).send({ idOrderBook: 1 });

    // Assertions
    expect(mockUpdateOrderBook).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ "modifiedCount": 1 });
    expect(response.statusCode).toBe(200);

  });

  test('Test update OrderBook fail', async () => {
    const mockUpdateOrderBook = jest.fn(() => { return { "modifiedCount": 0 } })

    // Mock the controller function
    jest.spyOn(OrderBook, "updateOne").mockImplementation(() => mockUpdateOrderBook())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/OrderBook/${1}/${1}`).send({ idOrderBook: 1 });

    // Assertions
    expect(mockUpdateOrderBook).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Unable to update ordered book, error occord" });

  });

  test('Test get exception', async () => {
    const mockUpdateOrderBook = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(OrderBook, "updateOne").mockImplementation(() => mockUpdateOrderBook())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/OrderBook/${1}/${1}`).send({ idOrderBook: 1 });

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not update ordered book mock error" });
    expect(mockUpdateOrderBook).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiDeleteOrderBook', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test delete OrderBook by id', async () => {
    const mockDeleteOrderBookById = jest.fn(() => { return { "idOrderBook": 1 } })

    // Mock the controller function
    jest.spyOn(OrderBook, "findOneAndDelete").mockImplementation(() => mockDeleteOrderBookById())

    // Perform the DELETE request to the endpoint
    const response = await request(app).delete(endpoint + `/OrderBook/${1}/${1}`);

    // Assertions
    expect(mockDeleteOrderBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ "idOrderBook": 1 });

  });

  test('Test get null', async () => {
    const mockDeleteOrderBookById = jest.fn(() => null)

    // Mock the controller function
    jest.spyOn(OrderBook, "findOneAndDelete").mockImplementation(() => mockDeleteOrderBookById())

    // Perform the DELETE request to the endpoint
    const response = await request(app).delete(endpoint + `/OrderBook/${1}/${1}`);

    // Assertions
    expect(mockDeleteOrderBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(null);
  });

  test('Test get exception', async () => {
    const mockDeleteOrderBookById = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(OrderBook, "findOneAndDelete").mockImplementation(() => mockDeleteOrderBookById())

    // Perform the DELETE request to the endpoint
    const response = await request(app).delete(endpoint + `/OrderBook/${1}/${1}`);

    // Assertions
    expect(mockDeleteOrderBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not delete book mock error" });
  });

});

describe('Tests For: apiCreateOrderBook', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });
  const OrderBooks = [{ idOrderBook: 2, OrderBookName: "mock OrderBook" }]

  test('Test insertMany OrderBook', async () => {
    const mockInsertManyOrderBook = jest.fn(() => { return OrderBooks })

    // Mock the controller function
    jest.spyOn(OrderBook, "insertMany").mockImplementation(() => mockInsertManyOrderBook())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint).send(OrderBooks);

    // Assertions
    expect(mockInsertManyOrderBook).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(OrderBooks);
    expect(response.statusCode).toBe(200);

  });

  test('Test get exception', async () => {
    const mockInsertManyOrderBook = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(OrderBook, "insertMany").mockImplementation(() => mockInsertManyOrderBook())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint).send(OrderBooks);

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "mock error" });
    expect(mockInsertManyOrderBook).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiGetOrderBooksByFilter', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get late users', async () => {
    const mockGetOrderBooksByFilter = jest.fn(() => [{ idBook: 1 }, { idBook: 2 }])

    // Mock the controller function
    jest.spyOn(OrderBook, "aggregate").mockImplementation(() => mockGetOrderBooksByFilter())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint + '/orderBook').send({ idBook: 1 });

    // Assertions
    expect(mockGetOrderBooksByFilter).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ idBook: 1 }]);

  });

  test('Test get null', async () => {
    const mockGetOrderBooksByFilter = jest.fn(() => null)

    // Mock the controller function
    jest.spyOn(OrderBook, "aggregate").mockImplementation(() => mockGetOrderBooksByFilter())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint + '/orderBook').send({ idBook: 1 });

    // Assertions
    expect(mockGetOrderBooksByFilter).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);

  });

  test('Test get exception', async () => {
    const mockGetOrderBooksByFilter = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(OrderBook, "aggregate").mockImplementation(() => mockGetOrderBooksByFilter())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint + '/orderBook').send({ idBook: 1 });

    // Assertions
    expect(mockGetOrderBooksByFilter).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch data mock error" });

  });

});
