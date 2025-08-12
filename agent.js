
import readline from 'node:readline/promises';
import Groq from 'groq-sdk';
import {
  getTotalAmount,
  getTotalExpense,
  getTotalIncome,
  addExpense,
  addIncome
} from "./functions.js"
import { tools, SYSTEM_PROMPT } from './tools.js';


const GROQ_API_KEY = process.env.GROQ_API_KEY

const groq = new Groq({ apiKey: GROQ_API_KEY });

async function callAgent() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const messages = [
    {
      role: 'system',
      content: SYSTEM_PROMPT
    }

  ];

  // this is for user prompt loop
  while (true) {
    const question = await rl.question('User: ');

    if (question === 'bye') {
      break;
    }

    messages.push({
      role: 'user',
      content: question,
    });

    // this is for agent
    while (true) {
      const completion = await groq.chat.completions.create({
        messages: messages,
        model: 'llama-3.3-70b-versatile',
        tools
      });

      // console.log(JSON.stringify(completion.choices[0], null, 2));
      messages.push(completion.choices[0].message);

      const toolCalls = completion.choices[0].message.tool_calls;
      if (!toolCalls) {
        console.log(`Assistant: ${completion.choices[0].message.content}`);
        break;
      }
      const toolsFunc = {
        getTotalAmount,
        getTotalExpense,
        getTotalIncome,
        addExpense,
        addIncome
      }

      for (const tool of toolCalls) {
        const functionName = tool.function.name;
        const functionArgs = tool.function.arguments;

        let result = ''
        if (functionName === 'getTotalAmount') {
          result = await getTotalAmount();
        } else if (functionName === 'getTotalExpense') {
          result = await getTotalExpense();
        } else if (functionName === 'getTotalIncome') {
          result = await getTotalIncome();
        } else if (functionName === 'addExpense') {
          result = await addExpense(JSON.parse(functionArgs));
        } else if (functionName === 'addIncome') {
          result = await addIncome(JSON.parse(functionArgs));
        }

        messages.push({
          role: 'tool',
          content: result,
          tool_call_id: tool.id,
        });
        // console.log(JSON.stringify(messages, null, 2));
      }

      // console.log('===============');
      // console.log('MESSAGES:', messages);
    }
  }

  rl.close();
}

callAgent();

