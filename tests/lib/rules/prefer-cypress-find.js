'use strict';

const rule = require('../../../lib/rules/prefer-cypress-find');
const RuleTester = require('eslint').RuleTester;
const { ALL_QUERIES_METHODS } = require('../../../lib/utils');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
});
ruleTester.run('prefer-cypress-find', rule, {
  valid: ALL_QUERIES_METHODS.map(method => ({
    code: `cy.find${method}();`,
  })),

  invalid: ALL_QUERIES_METHODS.map(method => ({
    code: `cy.query${method}();`,
    errors: [
      {
        messageId: 'preferCypressFind',
        line: 1,
        column: 4,
      },
    ],
    output: `cy.find${method}();`,
  })),
});
