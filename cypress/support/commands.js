/// <reference types="cypress" />

import { format } from 'date-fns';

function runFakeServer() {
    return cy.intercept(
        'GET', 
        'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/*',
        { fixture: 'dates.xml' }
    );
};

function setTime(date) {
    return cy.clock(date, ['Date']).reload();
};

function setDateRange(startDate, endDate) {
    const startDateString = format(startDate, 'yyyy/MM/dd');
    const endDateString = format(endDate, 'yyyy/MM/dd');

    return cy.get('input').eq(0).clear().type(startDateString).type('{enter}')
        .get('input').eq(1).clear().type(endDateString).type('{enter}');
};

function hasStartDate(date) {
    const str = format(date, 'yyyy/MM/dd');
    return cy.get('input').eq(0).should('have.value', str);
};

function hasEndDate(date) {
    const str = format(date, 'yyyy/MM/dd');
    return cy.get('input').eq(1).should('have.value', str);
};

function hasResult(result) {
    return cy.get('[data-testid=result]').contains(`${result} 일`);
};

Cypress.Commands.add('hasResult', hasResult);
Cypress.Commands.add('hasStartDate', hasStartDate);
Cypress.Commands.add('hasEndDate', hasEndDate);

Cypress.Commands.add('setDateRange', setDateRange);
Cypress.Commands.add('setTime', setTime);
Cypress.Commands.add('runServer', runFakeServer);