'use strict';

const { getDocsUrl, ALL_QUERIES_METHODS } = require('../utils');

const QUERIES_COMBINATIONS_REGEXP = ALL_QUERIES_METHODS.map(
  method => `query${method}`
).join('|');

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'cy.query* methods are deprecated.',
      category: 'Best Practices',
      recommended: false,
      url: getDocsUrl('prefer-cypress-find'),
    },
    messages: {
      preferCypressFind: 'Use cy.find* instead cy.query*',
    },
    fixable: true,
    schema: [],
  },

  create: function(context) {
    function reportInvalidUsage(node) {
      context.report({
        node,
        messageId: 'preferCypressFind',
        data: { name: node.name },
        fix(fixer) {
          return fixer.replaceTextRange(
            node.range,
            node.name.replace('query', 'find')
          );
        },
      });
    }

    return {
      [`MemberExpression[object.name="cy"] > Identifier[name=/^${QUERIES_COMBINATIONS_REGEXP}$/]`]: reportInvalidUsage,
    };
  },
};
