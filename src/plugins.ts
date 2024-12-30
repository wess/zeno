import { existsSync, readdirSync } from "fs";
import { join } from "path";
import yaml from "yaml";
import { log } from "./log";

export interface Plugin {
  name: string;
  description: string;
  onCommand?: (command: string, args: string[]) => void;
}

export let plugins: Plugin[] = []; // Global list of loaded plugins

/**
 * Load plugins from the directory specified in manifest.yaml.
 * If the `plugins` key or directory doesn't exist, skip loading.
 * @param manifestPath Path to the manifest.yaml file (default: "manifest.yaml")
 */
export function loadPlugins(manifestPath: string = "manifest.yaml") {
  // Check if the manifest.yaml exists
  if (!existsSync(manifestPath)) {
    log.warn("No manifest.yaml file found. Skipping plugin loading.");
    return [];
  }

  // Parse the manifest.yaml file
  const manifestContent = require("fs").readFileSync(manifestPath, "utf-8");
  const manifest = yaml.parse(manifestContent);

  // Check for the `plugins` key in the manifest
  if (!manifest.plugins?.directory) {
    return [];
  }

  const pluginDir = manifest.plugins.directory;

  // Check if the plugin directory exists
  if (!existsSync(pluginDir)) {
    log.warn(`Plugin directory "${pluginDir}" not found. No plugins loaded.`);
    return [];
  }

  try {
    // Read and load each plugin in the directory
    const pluginFiles = readdirSync(pluginDir);
    plugins = pluginFiles.map((file) => {
      const pluginPath = join(pluginDir, file);
      try {
        const plugin = require(pluginPath) as Plugin;
        // Validate plugin structure
        if (!plugin.name || !plugin.description) {
          throw new Error(`Invalid plugin: missing name or description in ${pluginPath}`);
        }
        log.success(`Loaded plugin: ${plugin.name}`);
        return plugin;
      } catch (error) {
        log.error(`Failed to load plugin at ${pluginPath}: ${error.message}`);
        return null; // Skip invalid plugins
      }
    }).filter(Boolean) as Plugin[];

    return plugins;
  } catch (error) {
    log.error(`Error reading plugins from "${pluginDir}": ${error.message}`);
    return []
  }
}

/**
 * Execute a command using plugins.
 * This function checks if any loaded plugin can handle the given command.
 * @param command Command name
 * @param args Command arguments
 */
export function executePluginCommand(command: string, args: string[]) {
  let handled = false;
  plugins.forEach((plugin) => {
    if (plugin.onCommand) {
      plugin.onCommand(command, args);
      handled = true;
    }
  });

  if (!handled) {
    log.info(`No plugin handled the command: ${command}`);
  }

  return handled;
}
