/// <reference types="cypress" />

describe('test whether ui elements are working', () => {
    beforeEach(() => {
        cy.runServer();
        cy.visit('/');
    });

    it('show today if the range is not selected', () => {
        const date = new Date();

        cy.hasStartDate(date);
        cy.hasEndDate(date);
    });

    it('user can input the range of dates', () => {
        const start = new Date(2021, 8, 1);
        const end = new Date(2021, 8, 7);

        cy.setDateRange(start, end);
        cy.hasStartDate(start);
        cy.hasEndDate(end);
    });
});