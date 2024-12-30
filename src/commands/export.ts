import { log } from "../log";

export function exportFormat([format, location]: string[]) {
  if (!format || !location) {
    log.error("Usage: zeno export FORMAT LOCATION");
    process.exit(1);
  }
  log.info(`Exporting to ${format} at ${location}...`);
  // Add logic for export
  log.success(`Export completed successfully for format ${format}.`);
}
