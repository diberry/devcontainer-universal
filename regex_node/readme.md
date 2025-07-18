# Node.js Version Reference Scanner

This package scans markdown files for references to Node.js that mention a version number. It is designed to help you inventory, audit, or update documentation and code samples that specify Node.js versions.

## What will be found (valid matches)

- Any line that mentions "Node.js" or "nodejs" (case-insensitive) and includes a version number, version range, or version label. Examples:
  - `Node.js v18`, `Node.js 20`, `Node.js 14.x`, `Node.js v16.13.1 LTS`, `Node.js 8.0.0 or higher`, `Node.js 12.x | Linux | 3.x`, `node:18`
- Versioned LTS references (e.g., `Node.js v16.13.1 LTS`, `Node.js v18.18.0 LTS`, `[Node.js](...) v14 LTS or later`)
- Utility and installation commands that reference a Node.js version (e.g., `node --version`)

## What will NOT be found (ignored)

- Generic LTS references with no version (e.g., `Node.js LTS`, `Node.js (LTS)`, `Node.js long term support (LTS)`)
- Azure Functions Programming model references (e.g., `Node.js v3 programming model`, `Node.js v4 programming model`)
- Unrelated Azure SDK package install commands (e.g., `npm install azure-storage@2.7.0`)

## How it works

The scanner uses regular expressions to find lines that mention Node.js and a version. It is case-insensitive and returns the entire line for each match. See the test suite for a full list of positive and negative cases.

## Example output

```console
--- Positive Cases should find---
✅ Node.js driver | 2.1.1
✅ Node.js v18
✅ Node.js v20
✅ Node.js 12
✅ Node.js 14
✅ Node.js 16
✅ Node.js 18
✅ Node.js 20
✅ Node.js 22
✅ Node.js version 8.0 or later
✅ Node.js 8.0.0 or higher
✅ Node.js v4.0+
✅ Node.js v4.0 or above
✅ Node.js version 10.0.x or later
✅ Node.js version 12 or later
✅ Node.js 14.x
✅ Node.js 16.x.x
✅ Node.js 18.x.x
✅ Node.js 20.x
✅ Node.js 22.x
✅ Node.js version 8.11.10
✅ Node.js versions 16.x.x
✅ Node.js v10.16.0
✅ Node.js v20.14.0
✅ Node.js v16.13.1
✅ Node.js v18.18.0
✅ Node.js v18.19.1
✅ Node.js (16.14.2 and above)
✅ Node.js (~14)
✅ Node.js 8.11.1 and 10.14.1 are recommended
✅ Node.js 12.18.4 and above
✅ Node.js 16.20 or higher
✅ Node.js version 20.0 or later
✅ Node.js 18 or later
✅ Node.js 12.x | Linux | 3.x
✅ Node.js 14.x | Linux | 4.x
✅ node:12
✅ node:14
✅ node:16
✅ node:18
✅ node:20
✅ Node.js 12, Node.js 14, Node.js 16, Node.js 18, Node.js 20 (preview)
✅ **Node.js 18 or later** installed on your computer. You can download Node.js from the [official website](https://nodejs.org/).
✅ Install [Node.js](https://nodejs.org) and NPM (verified with Node.js v14.16.0 and NPM 6.14.11).
✅ Install [Node.js](https://nodejs.org) and npm (verified with Node.js v14.16.0 and npm 6.14.11).
✅ Fixed custom domain resolution not working with Node.js v22 or newer.
✅ Changed Node.js to version v16.13.0
✅ Node.js 16.2.0
✅ Node.js v16.13.1 LTS
✅ Node.js v18.18.0 LTS
✅ Node.js Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 recommended)
✅ [Current Node.js v14 LTS or later](https://nodejs.org/)
✅ [Node.js](https://nodejs.org/) v14 LTS or later
✅ [Node.js](https://nodejs.org/) v16 LTS

stdout | src/scanner.test.ts > Node.js version reference scanner > does not match LTS/negative cases
--- LTS/Negative Cases should not find ---
✅ Node.js, Active LTS and Maintenance LTS versions
✅ Node.js LTS
✅ Node.js (LTS)
✅ Node.js long term support (LTS)
✅ Node.js LTS versions
✅ Node.js LTS releases
✅ Node.js LTS release
✅ Node long term
✅ Node.js v3 programming model
✅ Node.js v4 programming model
✅ npm install azure-storage@2.7.0
✅ node --version

 ✓ src/scanner.test.ts (2)
   ✓ Node.js version reference scanner (2)
     ✓ matches all positive (non-LTS) Node.js version references
     ✓ does not match LTS/negative cases

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  15:48:58
   Duration  397ms (transform 74ms, setup 0ms, collect 60ms, tests 15ms, environment 0ms, prepare 114ms)
```