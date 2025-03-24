const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const axios = require('axios');

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
  response = await axios.get(baseURL + endpoint);
});

When('I send a POST request to {string} with the payload', async function (endpoint) {
  response = await axios.post(baseURL + endpoint, payload);
});

Then('the response status code should be {int}', function (statusCode) {
  expect(response.status).toBe(statusCode);
});

Then('the response should contain a list of fruits', function () {
  expect(Array.isArray(response.data)).toBe(true);
});

Then('the list should include {string} and {string}', function (fruit1, fruit2) {
  const fruitNames = response.data.map(fruit => fruit.name);
  expect(fruitNames).toContain(fruit1);
  expect(fruitNames).toContain(fruit2);
});

Then('the response should contain:', function (docString) {
  const expectedResponse = JSON.parse(docString);
  expect(response.data).toMatchObject(expectedResponse);
});