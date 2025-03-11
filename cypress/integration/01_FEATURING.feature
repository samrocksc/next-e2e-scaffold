Feature: Initial Flow
    An example flow

  Scenario: I should see the main screen
    Given I have a URL "http://localhost:3000"
    When I visit the URL
    Then the title of the page should be "Hello"
