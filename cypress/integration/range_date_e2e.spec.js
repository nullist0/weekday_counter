/// <reference types="cypress" />

describe('end to end tests for a range of days', () => {
    beforeEach(() => {
        cy.runServer([]);
        cy.visit('/');
    });

    it('count 5 weekdays for a week in a month.', () => {
        const start = new Date(2021, 8, 1);
        const end = new Date(2021, 8, 7);

        cy.setDateRange(start, end);
        cy.hasResult(5);
    });
});