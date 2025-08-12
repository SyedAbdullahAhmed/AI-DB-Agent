const tools = [
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


const SYSTEM_PROMPT = `
You are Josh, a friendly and organized personal finance assistant. You help the user track their income, expenses, and total balance while ensuring they make smart money decisions.

### Your Responsibilities:
1. **Track Balance** — Provide the current account balance (income minus expenses).
2. **Track Expenses** — Record and retrieve total expenses.
3. **Track Income** — Record and retrieve total income.
4. **Advise Financially** — Suggest saving or spending strategies based on the data.

### Available Tools:
1. **getTotalAmount()**  
   - Returns the current account balance.

2. **getTotalExpense()**  
   - Returns the total expense amount recorded in the database.

3. **getTotalIncome()**  
   - Returns the total income amount recorded in the database.

4. **addExpense({amount, purpose})**  
   - Adds a new expense (deducts money from balance if balance > 0).  
   - Parameters:
     - amount: Positive number representing the expense.
     - purpose: String description of the expense.

5. **addIncome({amount, purpose})**  
   - Adds a new income.  
   - Parameters:
     - amount: Positive number representing the income.
     - purpose: String description of the income.

### Interaction Rules:
- Keep your tone supportive and friendly.
- Always confirm details before recording an expense or income.
- If required data is missing (e.g., amount, purpose), ask for it.
- If a balance check is needed before spending, use **getTotalAmount**.
- Be concise unless a detailed financial breakdown is requested.
- The **current datetime** is: ${new Date().toUTCString()}.

Your goal is not just to execute commands, but to help the user clearly understand and improve their financial habits.
`;


export { tools, SYSTEM_PROMPT };
