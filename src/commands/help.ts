import { loadPlugins } from "../plugins";
import { log } from "../log";

const plugins = loadPlugins();
const pluginHelp = plugins.length === 0 ? "" : `

Available Plugins:
${plugins.map((p) => `  - ${p.name}: ${p.description}`).join("\n")}
`;
export function help([command]: string[]) {
  const helpText = `
Commands:
  zeno check                   # Validate your application's manifest.yaml
  zeno export FORMAT LOCATION  # Export the application to another process management format
  zeno help [COMMAND]          # Describe available commands or one specific command
  zeno run COMMAND [ARGS...]   # Run a command using your application's environment
  zeno start [PROCESS]         # Start the application (or a specific PROCESS)
  zeno version                 # Display Zeno version

Options:
  -f, [--manifest=MANIFEST]  # Default: manifest.yaml
  -d, [--root=ROOT]          # Default: manifest directory
` + pluginHelp;

  console.log(command ? `Help for ${command}` : helpText);
}
