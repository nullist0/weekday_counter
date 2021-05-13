/// <reference types="cypress" />

describe('e2e', () => {
    beforeEach(() => {
        cy.intercept(
            'GET', 
            'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/*',
            { fixture: 'dates.xml' }
        );
        cy.visit('http://localhost:3000/weekday_counter');
    });

    it('show today if dates are not selected', () => {
        cy.clock(new Date(2021, 4, 13), ['Date']);
        
        cy.reload();

        cy.get('[data-testid=start_date]').contains('2021/05/13');
        cy.get('[data-testid=end_date]').contains('2021/05/13');

    });

    it('count 1 day if today is a weekday', () => {
        cy.clock(new Date(2015, 8, 1), ['Date']);

        cy.reload();

        cy.get('[data-testid=result]').contains('1 일');
    });

    it('count 0 day if today is a saturday', () => {
        cy.clock(new Date(2015, 8, 5), ['Date']);
        cy.reload();

        cy.get('[data-testid=result]').contains('0 일');
    });

    it('count 0 day if today is a sunday', () => {
        cy.clock(new Date(2015, 8, 6), ['Date']);
        cy.reload();

        cy.get('[data-testid=result]').contains('0 일');
    });

    it('count 0 day if today is a holiday in server', () => {
        cy.clock(new Date(2015, 8, 28), ['Date']);
        cy.reload();

        cy.get('[data-testid=result]').contains('0 일');
    });
});