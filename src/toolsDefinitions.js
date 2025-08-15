const toolsDefinitions = [
  {
    type: 'function',
    function: {
      name: 'getTotalAmount',
      description: 'Get the current total account balance (income minus expenses).',
    },
  },
  {
    type: 'function',
    function: {
      name: 'getTotalExpense',
      description: 'Get the total expense amount recorded in the database.',
    },
  },
  {
    type: 'function',
    function: {
      name: 'getTotalIncome',
      description: 'Get the total income amount recorded in the database.',
    },
  },
  {
    type: 'function',
    function: {
      name: 'addExpense',
      description: 'Add a new expense entry to the database (will only work if there is money available).',
      parameters: {
        type: 'object',
        properties: {
          amount: {
            type: 'number',
            description: 'Amount of the expense (must be positive).',
          },
          purpose: {
            type: 'string',
            description: 'Purpose or description of the expense. e.g., "Bought groceries"',
          },
        },
        required: ['amount', 'purpose'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'addIncome',
      description: 'Add a new income entry to the database.',
      parameters: {
        type: 'object',
        properties: {
          amount: {
            type: 'number',
            description: 'Amount of the income (must be positive).',
          },
          purpose: {
            type: 'string',
            description: 'Purpose or description of the income. e.g., "Salary from job"',
          },
        },
        required: ['amount', 'purpose'],
      },
    },
  },
];



export { toolsDefinitions };
