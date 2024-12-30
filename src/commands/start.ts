import { spawn } from "child_process";
import { readFileSync, existsSync } from "fs";
import yaml from "yaml";
import { log } from "../log";
import { loadPlugins } from "../plugins";

interface Manifest {
  processes: Record<string, string>;
}

export function start([processName]: string[]) {
  if (!existsSync("manifest.yaml")) {
    log.error("manifest.yaml not found.");
    process.exit(1);
  }

  const fileContent = readFileSync("manifest.yaml", "utf-8");
  const manifest = yaml.parse(fileContent) as Manifest;

  if (!manifest.processes) {
    log.error("No processes defined in manifest.yaml.");
    process.exit(1);
  }

  // Load plugins
  loadPlugins();

  const runProcess = (name: string, command: string) => {
    log.info(`Starting process ${name} with command: ${command}`);
    const [cmd, ...args] = command.split(" ");
    const child = spawn(cmd, args, { stdio: "inherit" });

    child.on("error", (error) => {
      log.error(`Error starting process ${name}: ${error.message}`);
    });

    child.on("close", (code) => {
      if (code === 0) {
        log.success(`Process ${name} exited successfully.`);
      } else {
        log.error(`Process ${name} exited with code ${code}.`);
      }
    });
  };

  if (processName) {
    const command = manifest.processes[processName];
    if (command) {
      runProcess(processName, command);
    } else {
      log.error(`Process ${processName} not found.`);
    }
  } else {
    Object.entries(manifest.processes).forEach(([name, command]) => {
      runProcess(name, command);
    });
  }
}
