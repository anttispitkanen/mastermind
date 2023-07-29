import readline from 'readline';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const readInput = (prompt: string): Promise<string> =>
  new Promise((resolve, _) => rl.question(prompt, resolve));
