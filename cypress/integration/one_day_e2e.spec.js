/// <reference types="cypress" />

describe('One day end to end tests', () => {
    beforeEach(() => {
        cy.runServer();
        cy.visit('/');
    });

    it('show today if dates are not selected', () => {
        const date = new Date(2021, 4, 13);
        cy.setTime(date);
        cy.hasStartDate(date);
        cy.hasEndDate(date);
    });

    it('count 1 day if today is a weekday', () => {
        const date = new Date(2015, 8, 1);
        cy.setTime(date);
        cy.hasResult(1);
    });

    it('count 0 day if today is a saturday', () => {
        const date = new Date(2015, 8, 5);
        cy.setTime(date);
        cy.hasResult(0);
    });

    it('count 0 day if today is a sunday', () => {
        const date = new Date(2015, 8, 6);
        cy.setTime(date);
        cy.hasResult(0);
    });

    it('count 0 day if today is a holiday in server', () => {
        const date = new Date(2015, 8, 28);
        cy.setTime(date);
        cy.hasResult(0);
    });
});