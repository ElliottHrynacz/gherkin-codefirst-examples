Feature: User Login

  Background:
    Given the user is on the login page

  Scenario: Successful login with valid credentials
    Given the user enters a valid username and password
    When the user clicks the login button
    Then the user should be redirected to the dashboard
    And a welcome message should be displayed

  Scenario: Unsuccessful login with invalid credentials
    Given the user enters an invalid username and password
    When the user clicks the login button
    Then an error message should be displayed

  Scenario: Unsuccessful login with empty credentials
    Given the user leaves the username and password fields empty
    When the user clicks the login button
    Then an error message should be displayed