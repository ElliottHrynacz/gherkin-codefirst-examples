const { request } = require('@playwright/test');

let baseURL;
let response;
let payload;

Given('the API base URL is {string}', function (url) {
  baseURL = url;
});

Given('the request payload is:', function (docString) {
  payload = JSON.parse(docString);
});

When('I send a GET request to {string}', async function (endpoint) {
  const apiContext = await request.newContext();
  response = await apiContext.get(baseURL + endpoint);
});

When('I send a POST request to {string} with the payload', async function (endpoint) {
  const apiContext = await request.newContext();
  response = await apiContext.post(baseURL + endpoint, { data: payload });
});

Then('the response status code should be {int}', function (statusCode) {
  expect(response.status()).toBe(statusCode);
});

Then('the response should contain a list of fruits', async function () {
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
});

Then('the response should contain:', async function (docString) {
  const expectedResponse = JSON.parse(docString);
  const responseBody = await response.json();
  expect(responseBody).toEqual(expectedResponse);
});

Then('the list should include {string} and {string}', async function (fruit1, fruit2) {
  const responseBody = await response.json();
  expect(responseBody).toContain(fruit1);
  expect(responseBody).toContain(fruit2);
});