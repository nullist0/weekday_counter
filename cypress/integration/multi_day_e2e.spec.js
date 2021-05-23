/// <reference types="cypress" />

describe('Multiple day end to end tests', () => {
    beforeEach(() => {
        cy.runServer();
        cy.visit('/');
    });

    it('input test', () => {
        const startDate = new Date(2021, 8, 1);
        const endDate = new Date(2021, 8, 7);
        cy.setDateRange(startDate, endDate);

        cy.hasStartDate(startDate);
        cy.hasEndDate(endDate);
    });

    it('count 5 for a week in a month.', () => {
        const startDate = new Date(2021, 8, 1);
        const endDate = new Date(2021, 8, 7);
        cy.setDateRange(startDate, endDate);
        
        cy.hasResult(5);
    });
});