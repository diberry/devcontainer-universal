import { promises as fs } from 'fs';
import path from 'path';

// Regex to match Node.js version references (not generic LTS or programming model)
// Matches Node.js or nodejs followed by a version, optionally with LTS and a version
const nodeVersionRegex = /\b(node\.?js|nodejs)\b[^\n]*?(v?\d+(\.\d+)*([-.]x)?|\d+\.x(\.\d+)*|~\d+|node:\d+|\d+)(?![^\n]*\bLTS\b(?![\d]))/gi;
const nodeColonVersionRegex = /\bnode:\d+\b/gi;
const versionedLTSRegex = /\b(node\.?js|nodejs)[^\n]*?(v?\d+(\.\d+)*([-.]x)?)[^\n]*?LTS\b/gi;

// Helper to check if a match is a generic LTS-only reference (no version)
function isGenericLTS(str: string): boolean {
  // Only matches if LTS is present and there is no version number
  return /\bLTS\b/i.test(str) && !/\d/.test(str);
}

// Helper to filter out programming model and unrelated matches
function isProgrammingModelOrUnrelated(str: string): boolean {
  return /programming model|npm install azure-storage@|v3 programming model|v4 programming model/i.test(str);
}

// Scan a markdown file for Node.js version references that are NOT generic LTS or programming model
export async function scanMarkdownFile(filePath: string): Promise<string[]> {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  const matches: string[] = [];
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    // If any regex matches, add the full line (case-insensitive)
    const found =
      nodeVersionRegex.test(lowerLine) ||
      nodeColonVersionRegex.test(lowerLine) ||
      versionedLTSRegex.test(lowerLine);
    // Reset regex state for global regexes
    nodeVersionRegex.lastIndex = 0;
    nodeColonVersionRegex.lastIndex = 0;
    versionedLTSRegex.lastIndex = 0;
    if (found && !isGenericLTS(line) && !isProgrammingModelOrUnrelated(line)) {
      matches.push(line);
    }
  }
  return matches;
}

// Recursively scan a directory for markdown files and scan each
export async function scanRepoForNodeVersions(dir: string): Promise<{file: string, matches: string[]}[]> {
  let results: {file: string, matches: string[]}[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await scanRepoForNodeVersions(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const matches = await scanMarkdownFile(fullPath);
      if (matches.length > 0) {
        results.push({ file: fullPath, matches });
      }
    }
  }
  return results;
}
