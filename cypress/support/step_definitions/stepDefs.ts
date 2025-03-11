import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I have a URL {string}", function (url: string) {
  this.url = url;
});

When("I visit the URL", function () {
  cy.visit(this.url);
});

Then("the title of the page should be {string}", function (title: string) {
  cy.title().should("eq", title);
});
