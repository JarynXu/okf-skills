#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { validateSkill } from "./skill-format.mjs";

const root = path.resolve("skills");
const directories = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(root, entry.name));

if (!directories.length) {
  console.error("no skills found");
  process.exit(1);
}

let failed = false;
for (const directory of directories) {
  const errors = validateSkill(directory);
  if (errors.length) {
    failed = true;
    for (const error of errors) console.error(`${directory}: ${error}`);
  } else {
    console.log(`valid: ${directory}`);
  }
}
if (failed) process.exit(1);
