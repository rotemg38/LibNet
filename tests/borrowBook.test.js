const request = require('supertest');
const express = require('express')
const bodyParser = require('body-parser');

const { expect, test, describe } = require('@jest/globals');

// Import the router
const router = require('../server/routes/borrowBookRouter');

const BorrowBook = require('../server/models/BorrowBook');

const endpoint = '/api/borrowBooks'

// Create an express app and use the router
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(endpoint, router);


describe('Tests For: apiGetAllBorrowBooks', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get all borrowBooks', async () => {
    const mockGetAllborrowBooks = jest.fn(() => ['borrowBook1', 'borrowBook2'])

    // Mock the controller function
    jest.spyOn(BorrowBook, "find").mockImplementation(() => mockGetAllborrowBooks())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/');

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(['borrowBook1', 'borrowBook2']);
    expect(mockGetAllborrowBooks).toHaveBeenCalledTimes(1);
  });

  test('Test get null', async () => {
    const mockGetAllborrowBooks = jest.fn(() => { null })

    // Mock the controller function
    jest.spyOn(BorrowBook, "find").mockImplementation(() => mockGetAllborrowBooks())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/');

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("No books found!");
    expect(mockGetAllborrowBooks).toHaveBeenCalledTimes(1);
  });

  test('Test get exception', async () => {
    const mockGetAllborrowBooks = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(BorrowBook, "find").mockImplementation(() => mockGetAllborrowBooks())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/');

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch data mock error" });
    expect(mockGetAllborrowBooks).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiUpdateBorrowBook', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });

  test('Test update borrowBook success', async () => {
    const mockUpdateBorrowBook = jest.fn(() => { return { "modifiedCount": 1 } })

    // Mock the controller function
    jest.spyOn(BorrowBook, "updateOne").mockImplementation(() => mockUpdateBorrowBook())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/borrowBook/${1}/${1}`).send({ idborrowBook: 1 });

    // Assertions
    expect(mockUpdateBorrowBook).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ "modifiedCount": 1 });
    expect(response.statusCode).toBe(200);

  });

  test('Test update borrowBook fail', async () => {
    const mockUpdateBorrowBook = jest.fn(() => { return { "modifiedCount": 0 } })

    // Mock the controller function
    jest.spyOn(BorrowBook, "updateOne").mockImplementation(() => mockUpdateBorrowBook())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/borrowBook/${1}/${1}`).send({ idborrowBook: 1 });

    // Assertions
    expect(mockUpdateBorrowBook).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Unable to update borrowed book, error occord" });

  });

  test('Test get exception', async () => {
    const mockUpdateBorrowBook = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(BorrowBook, "updateOne").mockImplementation(() => mockUpdateBorrowBook())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/borrowBook/${1}/${1}`).send({ idborrowBook: 1 });

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not update Borrowed Book mock error" });
    expect(mockUpdateBorrowBook).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiDeleteborrowBook', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test delete borrowBook by id', async () => {
    const mockDeleteborrowBookById = jest.fn(() => { return { "idborrowBook": 1 } })

    // Mock the controller function
    jest.spyOn(BorrowBook, "findOneAndDelete").mockImplementation(() => mockDeleteborrowBookById())

    // Perform the DELETE request to the endpoint
    const response = await request(app).delete(endpoint + `/borrowBook/${1}/${1}`);

    // Assertions
    expect(mockDeleteborrowBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ "idborrowBook": 1 });

  });

  test('Test get null', async () => {
    const mockDeleteborrowBookById = jest.fn(() => null)

    // Mock the controller function
    jest.spyOn(BorrowBook, "findOneAndDelete").mockImplementation(() => mockDeleteborrowBookById())

    // Perform the DELETE request to the endpoint
    const response = await request(app).delete(endpoint + `/borrowBook/${1}/${1}`);

    // Assertions
    expect(mockDeleteborrowBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(null);
  });

  test('Test get exception', async () => {
    const mockDeleteborrowBookById = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(BorrowBook, "findOneAndDelete").mockImplementation(() => mockDeleteborrowBookById())

    // Perform the DELETE request to the endpoint
    const response = await request(app).delete(endpoint + `/borrowBook/${1}/${1}`);

    // Assertions
    expect(mockDeleteborrowBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not delete book mock error" });
  });

});

describe('Tests For: apiCreateborrowBook', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });
  const borrowBooks = [{ idBorrowBook: 2, borrowBookName: "mock borrowBook" }]

  test('Test insertMany borrowBook', async () => {
    const mockInsertManyBorrowBook = jest.fn(() => { return borrowBooks })

    // Mock the controller function
    jest.spyOn(BorrowBook, "insertMany").mockImplementation(() => mockInsertManyBorrowBook())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint).send(borrowBooks);

    // Assertions
    expect(mockInsertManyBorrowBook).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(borrowBooks);
    expect(response.statusCode).toBe(200);

  });

  test('Test get exception', async () => {
    const mockInsertManyBorrowBook = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(BorrowBook, "insertMany").mockImplementation(() => mockInsertManyBorrowBook())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint).send(borrowBooks);

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "mock error" });
    expect(mockInsertManyBorrowBook).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiGetLateUsersBorrows', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get late users', async () => {
    const mockGetLateUsers = jest.fn(() => ['Group1', 'Group2'])

    // Mock the controller function
    jest.spyOn(BorrowBook, "aggregate").mockImplementation(() => mockGetLateUsers())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/lateUsers');

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(['Group1', 'Group2']);
    expect(mockGetLateUsers).toHaveBeenCalledTimes(1);
  });

  test('Test get null', async () => {
    const mockGetLateUsers = jest.fn(() => { null })

    // Mock the controller function
    jest.spyOn(BorrowBook, "aggregate").mockImplementation(() => mockGetLateUsers())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/lateUsers');

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("No users found!");
    expect(mockGetLateUsers).toHaveBeenCalledTimes(1);
  });

  test('Test get exception', async () => {
    const mockGetLateUsers = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(BorrowBook, "aggregate").mockImplementation(() => mockGetLateUsers())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/lateUsers');

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch data mock error" });
    expect(mockGetLateUsers).toHaveBeenCalledTimes(1);
  });

});