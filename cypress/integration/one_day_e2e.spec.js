/// <reference types="cypress" />

describe('end to end tests for a day', () => {
    beforeEach(() => {
        cy.runServer();
        cy.visit('/');
    });

    it('count 1 weekday for a weekday', () => {
        const date = new Date(2015, 8, 1);

        cy.setDate(date);
        cy.hasResult(1);
    });

    it('count 0 weekday for a saturday', () => {
        const date = new Date(2015, 8, 5);

        cy.setDate(date);
        cy.hasResult(0);
    });

    it('count 0 weekday for a sunday', () => {
        const date = new Date(2015, 8, 6);

        cy.setDate(date);
        cy.hasResult(0);
    });

    it('count 0 weekday for a holiday in the server', () => {
        const date = new Date(2015, 8, 28);

        cy.setDate(date);
        cy.hasResult(0);
    });
});