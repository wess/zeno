import { readFileSync, writeFileSync } from "fs";

// Parse arguments
const bumpType = process.argv[2];
if (!bumpType) {
  console.error("Error: No bump type provided (patch, minor, major).");
  process.exit(1);
}

// Read and parse package.json
const packageJsonPath = "./package.json";
const packageData = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

// Increment version
const [major, minor, patch] = packageData.version.split(".").map(Number);
let newVersion;
if (bumpType === "patch") newVersion = `${major}.${minor}.${patch + 1}`;
else if (bumpType === "minor") newVersion = `${major}.${minor + 1}.0`;
else if (bumpType === "major") newVersion = `${major + 1}.0.0`;
else {
  console.error("Error: Invalid bump type. Use patch, minor, or major.");
  process.exit(1);
}

// Update package.json
packageData.version = newVersion;
writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));

console.log(`Version bumped to ${newVersion}`);
