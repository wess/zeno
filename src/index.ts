import { log } from "./log";
import { check } from "./commands/check";
import { exportFormat } from "./commands/export";
import { help } from "./commands/help";
import { run } from "./commands/run";
import { start } from "./commands/start";
import { version } from "./commands/version";
import { loadPlugins, executePluginCommand } from "./plugins";

function main() {
  const args = Bun.argv.slice(2);
  const command = args[0];
  const options = args.slice(1);

  if (!command) {
    log.error("No command provided.");
    help([]);
    return;
  }

  // Built-in commands
  const commands: Record<string, Function> = {
    check,
    export: exportFormat,
    help,
    run,
    start,
    version,
  };

  const builtInCommand = commands[command];
  if (builtInCommand) {
    builtInCommand(options);
  } else {
    // Load plugins
    loadPlugins();

    // Attempt to execute the command with plugins
    const handledByPlugin = executePluginCommand(command, options);
    if (handledByPlugin) {
      return;
    }

    log.error(`Unknown command: "${command}"`);
    help([]);
  }
}

main();
