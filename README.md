
# Zeno

Zeno is a Foreman style utility with plugin support with Bun and TypeScript.

## Features
- Supports Procfile-like configuration using `manifest.yaml`
- Handles built-in commands such as `start`, `check`, `run`, and more
- Extensible through a robust plugin system
- Lightweight and blazing fast using Bun

## Installation

To install Zeno, run the following command in your terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/wess/zeno/main/install.sh)"
```

This will:
1. Detect your platform and architecture.
2. Download the latest Zeno binary.
3. Install it to `/usr/local/bin`.

## Usage

### Available Commands
```bash
zeno start           # Start the application
zeno check           # Validate your application's manifest.yaml
zeno run <command>   # Run a custom command
zeno help            # Display help information
zeno version         # Display Zeno version
```

### Plugins
Zeno supports an extensible plugin system. To use plugins:
1. Add a `plugins` section to your `manifest.yaml`:
   ```yaml
   plugins:
     directory: .zeno/plugins
   ```
2. Place your plugin files in the specified directory.

### Example Plugin
Create a plugin file `.zeno/plugins/hello-plugin.js`:
```javascript
export const name = "Hello Plugin";
export const description = "Responds to the 'hello' command";

export function onCommand(command, args) {
  if (command === "hello") {
    console.log("Hello from the plugin!");
  }
}
```

Run the command:
```bash
zeno hello
```

## Development

### Build Zeno
To build Zeno locally:
```bash
bun run build
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
MIT
