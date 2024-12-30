import { existsSync } from "fs";
import { log } from "../log";

export function check() {
  if (existsSync("manifest.yaml")) {
    log.success("manifest.yaml is valid.");
  } else {
    log.error("manifest.yaml not found.");
    process.exit(1);
  }
}
