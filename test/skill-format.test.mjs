import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { parseSkill, validateSkill } from "../scripts/skill-format.mjs";

test("repository skill is valid and exposes routing metadata", () => {
  const directory = path.resolve("skills/okf");
  assert.deepEqual(validateSkill(directory), []);
  const skill = parseSkill(directory);
  assert.equal(skill.properties.get("name"), "okf");
  assert.match(skill.properties.get("description"), /validate OKF knowledge/);
});

test("validator rejects a name that does not match its directory", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "skill-test-"));
  const directory = path.join(root, "actual-name");
  fs.mkdirSync(directory);
  fs.writeFileSync(path.join(directory, "SKILL.md"), "---\nname: other-name\ndescription: Use when testing a skill.\n---\n\n# Test\n");
  try {
    assert.ok(validateSkill(directory).some((error) => error.includes("must match directory")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("validator detects missing direct references", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "skill-test-"));
  const directory = path.join(root, "test-skill");
  fs.mkdirSync(directory);
  fs.writeFileSync(path.join(directory, "SKILL.md"), "---\nname: test-skill\ndescription: Use when testing a skill.\n---\n\nSee [missing](references/missing.md).\n");
  try {
    assert.ok(validateSkill(directory).some((error) => error.includes("missing referenced file")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
