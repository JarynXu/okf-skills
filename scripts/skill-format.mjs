import fs from "node:fs";
import path from "node:path";

const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_KEYS = new Set(["name", "description", "license", "compatibility", "metadata", "allowed-tools"]);

export function parseSkill(skillDirectory) {
  const file = path.join(skillDirectory, "SKILL.md");
  const source = fs.readFileSync(file, "utf8");
  if (!source.startsWith("---\n")) throw new Error(`${file}: missing opening YAML frontmatter delimiter`);
  const end = source.indexOf("\n---\n", 4);
  if (end < 0) throw new Error(`${file}: missing closing YAML frontmatter delimiter`);
  const frontmatter = source.slice(4, end);
  const body = source.slice(end + 5);
  return { file, source, body, properties: parseTopLevel(frontmatter) };
}

function parseTopLevel(frontmatter) {
  const properties = new Map();
  let current = null;
  for (const [index, line] of frontmatter.split("\n").entries()) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    if (/^\s/.test(line)) {
      if (!current) throw new Error(`frontmatter line ${index + 1}: unexpected indentation`);
      continue;
    }
    const match = /^([A-Za-z0-9_-]+):(?:\s*(.*))?$/.exec(line);
    if (!match) throw new Error(`frontmatter line ${index + 1}: unsupported YAML form`);
    current = match[1];
    properties.set(current, (match[2] ?? "").trim().replace(/^['"]|['"]$/g, ""));
  }
  return properties;
}

export function validateSkill(skillDirectory) {
  const errors = [];
  let skill;
  try {
    skill = parseSkill(skillDirectory);
  } catch (error) {
    return [error instanceof Error ? error.message : String(error)];
  }

  const directoryName = path.basename(skillDirectory);
  const name = skill.properties.get("name") ?? "";
  const description = skill.properties.get("description") ?? "";
  const compatibility = skill.properties.get("compatibility") ?? "";

  if (!name) errors.push("name is required");
  if (name !== directoryName) errors.push(`name ${name} must match directory ${directoryName}`);
  if (name.length > 64 || !NAME_PATTERN.test(name)) errors.push("name must be kebab-case and at most 64 characters");
  if (!description) errors.push("description is required");
  if (description.length > 1024) errors.push("description exceeds 1024 characters");
  if (description.includes("<") || description.includes(">")) errors.push("description must not contain angle brackets");
  if (compatibility.length > 500) errors.push("compatibility exceeds 500 characters");
  for (const key of skill.properties.keys()) {
    if (!ALLOWED_KEYS.has(key)) errors.push(`unsupported frontmatter key: ${key}`);
  }
  if (skill.source.split("\n").length > 500) errors.push("SKILL.md exceeds 500 lines");
  if (!skill.body.trim()) errors.push("SKILL.md instruction body is empty");

  for (const match of skill.body.matchAll(/\]\((references\/[^)#?]+)\)/g)) {
    if (!fs.existsSync(path.join(skillDirectory, match[1]))) errors.push(`missing referenced file: ${match[1]}`);
  }
  for (const match of skill.body.matchAll(/`?(scripts\/[A-Za-z0-9._/-]+)`?/g)) {
    if (!fs.existsSync(path.join(skillDirectory, match[1]))) errors.push(`missing referenced script: ${match[1]}`);
  }
  return errors;
}
