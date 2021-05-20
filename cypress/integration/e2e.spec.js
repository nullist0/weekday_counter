/// <reference types="cypress" />

import { format } from 'date-fns';

function hasStartDate(date) {
    const str = format(date, 'yyyy/MM/dd');
    cy.get('input').eq(0).should('have.value', str);
};

function hasEndDate(date) {
    const str = format(date, 'yyyy/MM/dd');
    cy.get('input').eq(1).should('have.value', str);
};

function hasResult(result) {
    cy.get('[data-testid=result]').contains(`${result} 일`);
};

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
        const date = new Date(2021, 4, 13);

        cy.clock(date, ['Date']);

        cy.reload();
        hasStartDate(date);
        hasEndDate(date);
    });

    it('count 1 day if today is a weekday', () => {
        cy.clock(new Date(2015, 8, 1), ['Date']);

        cy.reload();

        hasResult(1);
    });

    it('count 0 day if today is a saturday', () => {
        cy.clock(new Date(2015, 8, 5), ['Date']);
        cy.reload();

        hasResult(0);
    });

    it('count 0 day if today is a sunday', () => {
        cy.clock(new Date(2015, 8, 6), ['Date']);
        cy.reload();

        hasResult(0);
    });

    it('count 0 day if today is a holiday in server', () => {
        cy.clock(new Date(2015, 8, 28), ['Date']);
        cy.reload();

        hasResult(0);
    });
});