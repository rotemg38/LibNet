const request = require('supertest');
const express = require('express')
const bodyParser = require('body-parser');

const { expect, test, describe } = require('@jest/globals');

// Import the router
const router = require('../server/routes/userRouter');

const User = require('../server/models/User.js');

const endpoint = '/api/users'

// Create an express app and use the router
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(endpoint, router);


describe('Tests For: apiGetAllUsers', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get all Users', async () => {
    const mockGetAllUsers = jest.fn(() => ['User1', 'User2'])

    // Mock the controller function
    jest.spyOn(User, "find").mockImplementation(() => mockGetAllUsers())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/');

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(['User1', 'User2']);
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
  });

  test('Test get null', async () => {
    const mockGetAllUsers = jest.fn(() => { null })

    // Mock the controller function
    jest.spyOn(User, "find").mockImplementation(() => mockGetAllUsers())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/');

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("There are no users yet!");
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
  });

  test('Test get exception', async () => {
    const mockGetAllUsers = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(User, "find").mockImplementation(() => mockGetAllUsers())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/');

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch users mock error" });
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiGetUserById', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get User by id', async () => {
    const mockGetUserById = jest.fn(() => { return { "idUser": 1 } })

    // Mock the controller function
    jest.spyOn(User, "findOne").mockImplementation(() => mockGetUserById())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + `/user/${1}`);

    // Assertions
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ "idUser": 1 });

  });

  test('Test get null', async () => {
    const mockGetUserById = jest.fn(() => null)

    // Mock the controller function
    jest.spyOn(User, "findOne").mockImplementation(() => mockGetUserById())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + `/user/${1}`);

    // Assertions
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(null);
  });

  test('Test get exception', async () => {
    const mockGetUserById = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(User, "findOne").mockImplementation(() => mockGetUserById())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + `/user/${1}`);

    // Assertions
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "User not found. mock error" });
  });

});

describe('Tests For: apiUpdateUser', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });

  test('Test update User success', async () => {
    const mockUpdateUser = jest.fn(() => { return { "modifiedCount": 1 } })

    // Mock the controller function
    jest.spyOn(User, "updateOne").mockImplementation(() => mockUpdateUser())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/user/${1}`).send({ idUser: 1 });

    // Assertions
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ "modifiedCount": 1 });
    expect(response.statusCode).toBe(200);

  });

  test('Test update User fail', async () => {
    const mockUpdateUser = jest.fn(() => { return { "modifiedCount": 0 } })

    // Mock the controller function
    jest.spyOn(User, "updateOne").mockImplementation(() => mockUpdateUser())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/user/${1}`).send({ idUser: 1 });

    // Assertions
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Unable to update user, error occord" });

  });

  test('Test get exception', async () => {
    const mockUpdateUser = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(User, "updateOne").mockImplementation(() => mockUpdateUser())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/user/${1}`).send({ idUser: 1 });

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not update user mock error" });
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiDeleteUser', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test delete User by id', async () => {
    const mockDeleteUserById = jest.fn(() => { return { "idUser": 1 } })

    // Mock the controller function
    jest.spyOn(User, "findOneAndDelete").mockImplementation(() => mockDeleteUserById())

    // Perform the DELETE request to the endpoint
    const response = await request(app).delete(endpoint + `/user/${1}`);

    // Assertions
    expect(mockDeleteUserById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ "idUser": 1 });

  });

  test('Test get null', async () => {
    const mockDeleteUserById = jest.fn(() => null)

    // Mock the controller function
    jest.spyOn(User, "findOneAndDelete").mockImplementation(() => mockDeleteUserById())

    // Perform the DELETE request to the endpoint
    const response = await request(app).delete(endpoint + `/user/${1}`);

    // Assertions
    expect(mockDeleteUserById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(null);
  });

  test('Test get exception', async () => {
    const mockDeleteUserById = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(User, "findOneAndDelete").mockImplementation(() => mockDeleteUserById())

    // Perform the DELETE request to the endpoint
    const response = await request(app).delete(endpoint + `/user/${1}`);

    // Assertions
    expect(mockDeleteUserById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not delete user mock error" });
  });

});

describe('Tests For: apiCreateUser', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });
  const user = { idUser: 2, UserName: "mock User" }

  test('Test create User', async () => {
    const mockCountUser = jest.fn(() => { return 2 })
    const mockCreateUser = jest.fn(() => { return user })

    // Mock the controller function
    jest.spyOn(User, "create").mockImplementation(() => mockCreateUser())
    jest.spyOn(User, "count").mockImplementation(() => mockCountUser())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint).send(user);

    // Assertions
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockCountUser).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(user);
    expect(response.statusCode).toBe(200);

  });

  test('Test get exception', async () => {
    const mockCountUser = jest.fn(() => { return 2 })
    const mockCreateUser = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(User, "create").mockImplementation(() => mockCreateUser())
    jest.spyOn(User, "count").mockImplementation(() => mockCountUser())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint).send(user);

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "mock error" });
    expect(mockCountUser).toHaveBeenCalledTimes(1);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiGetGroupByAges', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get groups', async () => {
    const mockGetGroups = jest.fn(() => ['Group1', 'Group2'])

    // Mock the controller function
    jest.spyOn(User, "aggregate").mockImplementation(() => mockGetGroups())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/groupAge');

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(['Group1', 'Group2']);
    expect(mockGetGroups).toHaveBeenCalledTimes(1);
  });

  test('Test get null', async () => {
    const mockGetGroups = jest.fn(() => { null })

    // Mock the controller function
    jest.spyOn(User, "aggregate").mockImplementation(() => mockGetGroups())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/groupAge');

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("There are no users yet!");
    expect(mockGetGroups).toHaveBeenCalledTimes(1);
  });

  test('Test get exception', async () => {
    const mockGetGroups = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(User, "aggregate").mockImplementation(() => mockGetGroups())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/groupAge');

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch users mock error" });
    expect(mockGetGroups).toHaveBeenCalledTimes(1);
  });

});