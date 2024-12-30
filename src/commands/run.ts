import { exec } from "child_process";
import { log } from "../log";

export function run([command, ...args]: string[]) {
  if (!command) {
    log.error("Usage: zeno run COMMAND [ARGS...]");
    process.exit(1);
  }

  const fullCommand = [command, ...args].join(" ");

  log.info(`Running: ${fullCommand}`);
  const child = exec(fullCommand, (error, stdout, stderr) => {
    if (error) {
      log.error(`Error: ${error.message}`);
      return;
    }

    if (stderr) {
      log.warn(`Stderr: ${stderr}`);
      return;
    }

    log.success(`Output:\n${stdout}`);
  });

  child.stdout?.pipe(process.stdout);
  child.stderr?.pipe(process.stderr);
}
