/// <reference types="cypress" />

describe('e2e', () => {
    beforeEach(() => {
        cy.intercept(
            'GET', 
            'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/*',
            { fixture: 'dates.xml' }
        );
    });

    it('count one day if it is a weekday', () => {
        cy.clock(new Date(2015, 8, 1), ['Date']);
        cy.visit('http://localhost:3000/weekday_counter');

        cy.get('[data-testid=start_date]').contains('2015/09/01');
        cy.get('[data-testid=end_date]').contains('2015/09/01');

        cy.get('[data-testid=result]').contains('1 일');
    });
});