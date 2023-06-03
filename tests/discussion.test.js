const request = require('supertest');
const express = require('express')
const bodyParser = require('body-parser');

const { expect, test, describe } = require('@jest/globals');

// Import the router
const router = require('../server/routes/discussionRoutes');

const Discussion = require('../server/models/Discussion');

const endpoint = '/api/discussions'

// Create an express app and use the router
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(endpoint, router);


describe('Tests For: apiGetDiscussionsByForumWithReplies', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get all Discussions', async () => {
    let date1 = new Date();
    date1.setMonth(2)
    let date2 = new Date();
    date2.setMonth(3)
    const mockGetAllDiscussions = jest.fn(() => [{ idForum: '1', createdAt: date1, seenNum: [] }, { idForum: '1', createdAt: date2, seenNum: [] }])

    // Mock the controller function
    jest.spyOn(Discussion, "aggregate").mockImplementation(() => mockGetAllDiscussions())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/withReplies/1');

    // Assertions
    expect(response.body).toEqual([JSON.parse(JSON.stringify({ idForum: '1', createdAt: date2, seenNum: 0 })), JSON.parse(JSON.stringify({ idForum: '1', createdAt: date1, seenNum: 0 }))]);
    expect(response.statusCode).toBe(200);
    expect(mockGetAllDiscussions).toHaveBeenCalledTimes(1);
  });

  test('Test get []', async () => {
    const mockGetAllDiscussions = jest.fn(() => [])

    // Mock the controller function
    jest.spyOn(Discussion, "aggregate").mockImplementation(() => mockGetAllDiscussions())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/withReplies/1');

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
    expect(mockGetAllDiscussions).toHaveBeenCalledTimes(1);
  });

  test('Test get exception', async () => {
    const mockGetAllDiscussions = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Discussion, "aggregate").mockImplementation(() => mockGetAllDiscussions())

    // Perform the GET request to the endpoint
    const response = await request(app).get(endpoint + '/withReplies/1');

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch data mock error" });
    expect(mockGetAllDiscussions).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiGetDiscussionsByFilter', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test get Discussion by id', async () => {
    const mockGetDiscussionById = jest.fn(() => { return [{ "idDisc": 1, "seenNum": [] }] })

    // Mock the controller function
    jest.spyOn(Discussion, "find").mockImplementation(() => mockGetDiscussionById())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint + `/filtered`).send({ "idDisc": 1 });

    // Assertions
    expect(mockGetDiscussionById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ "idDisc": 1, "seenNum": 0 }]);

  });

  test('Test get []', async () => {
    const mockGetDiscussionById = jest.fn(() => [])

    // Mock the controller function
    jest.spyOn(Discussion, "find").mockImplementation(() => mockGetDiscussionById())

    // Perform the POST request to the endpoint
    const response = await request(app).post(endpoint + `/filtered`).send({ "idDisc": 1 });

    // Assertions
    expect(mockGetDiscussionById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('Test get exception', async () => {
    const mockGetDiscussionById = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Discussion, "find").mockImplementation(() => mockGetDiscussionById())

    // Perform the GET request to the endpoint
    const response = await request(app).post(endpoint + `/filtered`).send({ "idDisc": 1 });

    // Assertions
    expect(mockGetDiscussionById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not fetch data mock error" });
  });

});

describe('Tests For: apiUpdateDiscussion', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });

  test('Test update Discussion success', async () => {
    const mockUpdateDiscussion = jest.fn(() => { return { "modifiedCount": 1 } })

    // Mock the controller function
    jest.spyOn(Discussion, "updateOne").mockImplementation(() => mockUpdateDiscussion())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/disc/${1}`).send({ idDisc: 1 });

    // Assertions
    expect(mockUpdateDiscussion).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ "modifiedCount": 1 });
    expect(response.statusCode).toBe(200);

  });

  test('Test update Discussion fail', async () => {
    const mockUpdateDiscussion = jest.fn(() => { return { "modifiedCount": 0 } })

    // Mock the controller function
    jest.spyOn(Discussion, "updateOne").mockImplementation(() => mockUpdateDiscussion())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/disc/${1}`).send({ idDisc: 1 });

    // Assertions
    expect(response.body).toEqual({ "error": "Unable to update the discussion, error occord" });
    expect(mockUpdateDiscussion).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);


  });

  test('Test get exception', async () => {
    const mockUpdateDiscussion = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Discussion, "updateOne").mockImplementation(() => mockUpdateDiscussion())

    // Perform the PUT request to the endpoint
    const response = await request(app).put(endpoint + `/disc/${1}`).send({ idDiscussion: 1 });

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not update discussion mock error" });
    expect(mockUpdateDiscussion).toHaveBeenCalledTimes(1);
  });

});

describe('Tests For: apiDeleteDiscussion', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });


  test('Test delete Discussion by id', async () => {
    const mockDeleteDiscussionById = jest.fn(() => { return { "idDisc": 1 } })

    // Mock the controller function
    jest.spyOn(Discussion, "findOneAndDelete").mockImplementation(() => mockDeleteDiscussionById())

    // Perform the GET request to the endpoint
    const response = await request(app).delete(endpoint + `/disc/${1}`);

    // Assertions
    expect(mockDeleteDiscussionById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ "idDisc": 1 });

  });

  test('Test get null', async () => {
    const mockDeleteDiscussionById = jest.fn(() => null)

    // Mock the controller function
    jest.spyOn(Discussion, "findOneAndDelete").mockImplementation(() => mockDeleteDiscussionById())

    // Perform the GET request to the endpoint
    const response = await request(app).delete(endpoint + `/disc/${1}`);

    // Assertions
    expect(mockDeleteDiscussionById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(null);
  });

  test('Test get exception', async () => {
    const mockDeleteDiscussionById = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Discussion, "findOneAndDelete").mockImplementation(() => mockDeleteDiscussionById())

    // Perform the GET request to the endpoint
    const response = await request(app).delete(endpoint + `/disc/${1}`);

    // Assertions
    expect(mockDeleteDiscussionById).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "Could not delete discussion mock error" });
  });

});

describe('Tests For: apiCreateDiscussion', () => {

  afterAll(() => {
    // Clear all mock function calls after each test
    jest.clearAllMocks();
  });
  const discussion = { idDisc: 2, DiscussionName: "mock Discussion" }

  test('Test create Discussion', async () => {
    const mockCountDiscussion = jest.fn(() => { return 2 })
    const mockCreateDiscussion = jest.fn(() => { return discussion })

    // Mock the controller function
    jest.spyOn(Discussion, "create").mockImplementation(() => mockCreateDiscussion())
    jest.spyOn(Discussion, "count").mockImplementation(() => mockCountDiscussion())

    // Perform the PUT request to the endpoint
    const response = await request(app).post(endpoint).send(discussion);

    // Assertions
    expect(mockCreateDiscussion).toHaveBeenCalledTimes(1);
    expect(mockCountDiscussion).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(discussion);
    expect(response.statusCode).toBe(200);

  });

  test('Test get exception', async () => {
    const mockCountDiscussion = jest.fn(() => { return 2 })
    const mockCreateDiscussion = jest.fn(() => { throw ("mock error") })

    // Mock the controller function
    jest.spyOn(Discussion, "create").mockImplementation(() => mockCreateDiscussion())
    jest.spyOn(Discussion, "count").mockImplementation(() => mockCountDiscussion())

    // Perform the PUT request to the endpoint
    const response = await request(app).post(endpoint).send(discussion);

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ "error": "mock error" });
    expect(mockCountDiscussion).toHaveBeenCalledTimes(1);
    expect(mockCreateDiscussion).toHaveBeenCalledTimes(1);
  });

});
