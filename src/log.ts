import chalk from "chalk";

export const log = {
  success: (message: string) => {
    console.log(chalk.green(`✔️  ${message}`));
  },
  error: (message: string) => {
    console.error(chalk.red(`❌  ${message}`));
  },
  info: (message: string) => {
    console.log(chalk.blue(`ℹ️  ${message}`));
  },
  warn: (message: string) => {
    console.warn(chalk.yellow(`⚠️  ${message}`));
  },
  debug: (message: string) => {
    console.log(chalk.gray(`🐛  ${message}`));
  },
};
