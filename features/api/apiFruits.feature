Feature: Manage fruits via API

  Background:
    Given the API base URL is "https://api.example.com/v1"

  Scenario: Retrieve a list of fruits
    When I send a GET request to "/fruits"
    Then the response status code should be 200
    And the response should contain a list of fruits
    And the list should include "Apple" and "Banana"

  Scenario: Add a new fruit
    Given the request payload is:
      """
      {
        "name": "Mango",
        "id": 101
      }
      """
    When I send a POST request to "/fruits" with the payload
    Then the response status code should be 201
    And the response should contain:
      """
      {
        "message": "Fruit added successfully",
        "fruit": {
          "name": "Mango",
          "id": 101
        }
      }
      """