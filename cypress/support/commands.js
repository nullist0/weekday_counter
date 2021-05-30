/// <reference types='cypress' />

import { format } from 'date-fns';

function runFakeServer(dates) {
    return cy.intercept(
        'GET', 
        'https://shielded-forest-67184.herokuapp.com/*',
        { body: { dates } }
    ).as('fakeServer');
}

function waitFakeServer() {
    return cy.wait('@fakeServer');
}

function setDate(date) {
    return setDateRange(date, date);
}

function setDateRange(start, end) {
    const startDateString = format(start, 'yyyy/MM/dd');
    const endDateString = format(end, 'yyyy/MM/dd');

    return cy.get('input').eq(0).clear().type(startDateString).type('{enter}')
             .get('input').eq(1).clear().type(endDateString).type('{enter}');
}

function hasStartDate(date) {
    const str = format(date, 'yyyy/MM/dd');

    return cy.get('input').eq(0).should('have.value', str);
}

function hasEndDate(date) {
    const str = format(date, 'yyyy/MM/dd');

    return cy.get('input').eq(1).should('have.value', str);
}

function hasResult(result) {
    return cy.get('[data-testid=result]').contains(`${result} 일`);
}

Cypress.Commands.add('hasResult', hasResult);
Cypress.Commands.add('hasStartDate', hasStartDate);
Cypress.Commands.add('hasEndDate', hasEndDate);

Cypress.Commands.add('setDateRange', setDateRange);
Cypress.Commands.add('setDate', setDate);

Cypress.Commands.add('runServer', runFakeServer);
Cypress.Commands.add('waitServer', waitFakeServer);