const request = require('supertest');
const express = require('express')
const bodyParser = require('body-parser');

const { expect, test, describe } = require('@jest/globals');

// Import the router
const router = require('../server/routes/booksRoutes');

const Book = require('../server/models/Book.js');

const endpoint = '/api/books'

// Create an express app and use the router
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(endpoint, router);

describe('Tests For: apiGetLocations', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get all locations', async () => {
    const mockGetAllLocations = jest.fn(() => {return ['loc1', 'loc2']})

    // Mock the controller function
    jest.spyOn(Book, "distinct").mockImplementation(() => mockGetAllLocations())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint+'/location');

    // Assertions
    expect(mockGetAllLocations).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(['loc1', 'loc2']);
    expect(response.statusCode).toBe(200);
    
  });

  test('Test get null', async () => {
    const mockGetAllLocations = jest.fn(() => { null })

    // Mock the controller function
    jest.spyOn(Book, "distinct").mockImplementation(() => mockGetAllLocations())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint+'/location');

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("There are no books yet!");
    expect(mockGetAllLocations).toHaveBeenCalledTimes(1);
  });

  test('Test get exception', async () => {
    const mockGetAllLocations = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Book, "distinct").mockImplementation(() => mockGetAllLocations())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint+'/location');

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch books mock error" });
    expect(mockGetAllLocations).toHaveBeenCalledTimes(1);
  });

});

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
    const response = await request(app).get(endpoint+'/');

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
    const response = await request(app).get(endpoint+'/');

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
    const response = await request(app).get(endpoint+'/');

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch books mock error" });
    expect(mockGetAllBooks).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiGetBookById', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get book by id', async () => {
    const mockGetBookById = jest.fn(() => {return {"idBook": 1}})

    // Mock the controller function
    jest.spyOn(Book, "findOne").mockImplementation(() => mockGetBookById())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint+`/book/${1}`);

    // Assertions
    expect(mockGetBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"idBook": 1});
    
  });

  test('Test get null', async () => {
    const mockGetBookById = jest.fn(() => null )

    // Mock the controller function
    jest.spyOn(Book, "findOne").mockImplementation(() => mockGetBookById())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint+`/book/${1}`);

    // Assertions
    expect(mockGetBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(null);
  });

  test('Test get exception', async () => {
    const mockGetBookById = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Book, "findOne").mockImplementation(() => mockGetBookById())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint+`/book/${1}`);

    // Assertions
    expect(mockGetBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Book not found. mock error" });
  });

});

describe('Tests For: apiUpdateBook', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });

  test('Test update book success', async () => {
    const mockUpdateBook = jest.fn(() => {return {"modifiedCount":1}} )

    // Mock the controller function
    jest.spyOn(Book, "updateOne").mockImplementation(() => mockUpdateBook())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint+`/book/${1}`).send({idBook:1});

    // Assertions
    expect(mockUpdateBook).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({"modifiedCount":1});
    expect(response.statusCode).toBe(200);
    
  });

  test('Test update book fail', async () => {
    const mockUpdateBook = jest.fn(() => { return {"modifiedCount":0} })

    // Mock the controller function
    jest.spyOn(Book, "updateOne").mockImplementation(() => mockUpdateBook())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint+`/book/${1}`).send({idBook:1});

    // Assertions
    expect(mockUpdateBook).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({"error" : "Unable to update book, error occord"});
    
  });

  test('Test get exception', async () => {
    const mockUpdateBook = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Book, "updateOne").mockImplementation(() => mockUpdateBook())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint+`/book/${1}`).send({idBook:1});

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not update Book mock error" });
    expect(mockUpdateBook).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiDeleteBook', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test delete book by id', async () => {
    const mockDeleteBookById = jest.fn(() => {return {"idBook": 1}})

    // Mock the controller function
    jest.spyOn(Book, "findOneAndDelete").mockImplementation(() => mockDeleteBookById())

    // Perform the GET request to the endpoint
    const response = await request(app).delete(endpoint+`/book/${1}`);

    // Assertions
    expect(mockDeleteBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"idBook": 1});
    
  });

  test('Test get null', async () => {
    const mockDeleteBookById = jest.fn(() => null )

    // Mock the controller function
    jest.spyOn(Book, "findOneAndDelete").mockImplementation(() => mockDeleteBookById())

    // Perform the GET request to the endpoint
    const response = await request(app).delete(endpoint+`/book/${1}`);

    // Assertions
    expect(mockDeleteBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(null);
  });

  test('Test get exception', async () => {
    const mockDeleteBookById = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Book, "findOneAndDelete").mockImplementation(() => mockDeleteBookById())

    // Perform the GET request to the endpoint
    const response = await request(app).delete(endpoint+`/book/${1}`);

    // Assertions
    expect(mockDeleteBookById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not delete book mock error" });
  });

});

describe('Tests For: apiCreateBook', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });
  const book = {idBook:2 , bookName: "mock book"}

  test('Test create book', async () => {
    const mockCountBook = jest.fn(() => {return 2} )
    const mockCreateBook = jest.fn(() => {return book} )
    
    // Mock the controller function
    jest.spyOn(Book, "create").mockImplementation(() => mockCreateBook())
    jest.spyOn(Book, "count").mockImplementation(() => mockCountBook())
    
    // Perform the PUT request to the endpoint
    const response = await request(app).post(endpoint).send(book);
    
    // Assertions
    expect(mockCreateBook).toHaveBeenCalledTimes(1);
    expect(mockCountBook).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(book);
    expect(response.statusCode).toBe(200);
    
  });

  test('Test get exception', async () => {
    const mockCountBook = jest.fn(() => {return 2} )
    const mockCreateBook = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Book, "create").mockImplementation(() => mockCreateBook())
    jest.spyOn(Book, "count").mockImplementation(() => mockCountBook())

    // Perform the PUT request to the endpoint
    const response = await request(app).post(endpoint).send(book);

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "mock error" });
    expect(mockCountBook).toHaveBeenCalledTimes(1);
    expect(mockCreateBook).toHaveBeenCalledTimes(1);
  });

});
