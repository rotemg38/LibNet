const request = require('supertest');
const express = require('express')
const { expect, test, describe } = require('@jest/globals');

// Import the router
const router = require('../server/routes/booksRoutes');

const Book = require('../server/models/Book.js');

// Create an express app and use the router
const app = express();
app.use('/books', router);

describe('Tests For: apiGetAllBooks', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get all books', async () => {
    const mockGetAllBooks = jest.fn(() => ['Book1', 'Book2'])

    // Mock the controller function
    jest.spyOn(Book, "find").mockImplementation(() => mockGetAllBooks())

    // Perform the GET request to the endpoint
    const response = await request(app).get('/books');

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(['Book1', 'Book2']);
    expect(mockGetAllBooks).toHaveBeenCalledTimes(1);
  });

  test('Test get null', async () => {
    const mockGetAllBooks = jest.fn(() => { null })

    // Mock the controller function
    jest.spyOn(Book, "find").mockImplementation(() => mockGetAllBooks())

    // Perform the GET request to the endpoint
    const response = await request(app).get('/books');

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("There are no books yet!");
    expect(mockGetAllBooks).toHaveBeenCalledTimes(1);
  });

  test('Test get exception', async () => {
    const mockGetAllBooks = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Book, "find").mockImplementation(() => mockGetAllBooks())

    // Perform the GET request to the endpoint
    const response = await request(app).get('/books');

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch books mock error" });
    expect(mockGetAllBooks).toHaveBeenCalledTimes(1);
  });

});

