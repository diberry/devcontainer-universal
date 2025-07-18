DocuTune bulk update request


Request sent by: diberry@microsoft.com

Type of job: Ad hoc inventory (search for specific terms)

Custom request: Other: Specify below.

Metadata update (metadata field and replaement value):
Rebrand or terminology update (term to be searched, replacement, and source):
Editorial update (requested change, need, and source):
Security update (security vulnerability):
Other: Please find all instances of Node.js with version information. Proposed regex (from Copilot) is: (node\.?js|nodejs).*(v?\d+(\.\d+)*|\d+\.x(\.\d+)*) Node\.js.*(version\s*|v)?(\d+(\.\d+)*|\d+\.x(\.\d+)*) (LTS|Active|Maintenance).*(\d+\.\d+\.\d+|\d+\.x)
Run DocuTune standard ruleset in Learn Build:

One-time or scheduled:
If scheduled, how often:
Rulesets to apply:
Mode:
In-scope repos: All Azure content repos except archived and reference. If this is too broad, please let me know.

Business impact: Correct information about which version of Node.js is used when referring to Azure SDK usage. Node.js 18 is deprecated in July.

Additional information: 

## Node.js Version Reference Patterns Found



### 1. **Simple Version Numbers**
- `Node.js driver | 2.1.1` (driver version)
- `Node.js v18`, `Node.js v20`
- `Node.js 12`, `Node.js 14`, `Node.js 16`, `Node.js 18`, `Node.js 20`, `Node.js 22`

### 2. **Semantic Versioning (Major.Minor.Patch)**
- `Node.js version 8.0 or later`
- `Node.js 8.0.0 or higher`
- `Node.js v4.0+`
- `Node.js v4.0 or above`
- `Node.js version 10.0.x or later`
- `Node.js version 12 or later`
- `Node.js 14.x`
- `Node.js 16.x.x`
- `Node.js 18.x.x`
- `Node.js 20.x`
- `Node.js 22.x`

### 3. **Specific Full Version Numbers**
- `Node.js version 8.11.10`
- `Node.js versions 16.x.x`
- `Node.js v10.16.0`
- `Node.js v20.14.0`
- `Node.js v16.13.1 LTS`
- `Node.js v18.18.0`
- `Node.js v18.19.1`

### 4. **LTS (Long Term Support) References**
- `Node.js`, Active LTS and Maintenance LTS versions`
- `Node.js Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 recommended)`
- `Node.js (16.14.2 and above)`
- `Node.js (~14)` (tilde notation)

### 5. **Version Ranges and Comparisons**
- `Node.js 8.11.1 and 10.14.1 are recommended`
- `Node.js 12.18.4 and above`
- `Node.js 16.20 or higher`
- `Node.js version 20.0 or later`
- `Node.js 18 or later`

### 6. **Programming Model Versions**
- `Node.js v3 programming model`
- `Node.js v4 programming model`
- `Node.js v4 requires version 4.0.5382, or a later version`

### 7. **Runtime and Framework Versions**
- `Node.js 12.x | Linux | 3.x`
- `Node.js 14.x | Linux | 4.x`
- `node:12`, `node:14`, `node:16`, `node:18`, `node:20`

### 8. **Utility and Installation Commands**
- `node --version` (command to check version)
- `npm install azure-storage@2.7.0`
- `engines` field in `package.json`

### 9. **Version Constraints in Documentation**
- Minimum version requirements: `Node.js 8.0+`, `Node.js v4.0+`
- Recommended versions with specific patches: `8.11.1 and 10.14.1 recommended`
- Compatibility ranges: `Node.js 12, Node.js 14, Node.js 16, Node.js 18, Node.js 20 (preview)`

### 10. **Legacy and Deprecated Versions**
- References to older versions like `Node.js v4.0`, `Node.js 8.11.1`, `Node.js 10.x.x`
- Migration guides from `v3 to v4 programming model`

## Search Patterns for Finding Older Node.js Versions

To find older Node.js versions across your markdown files, you can use these search patterns:

**Regex patterns:**
- `(node\.?js|nodejs).*(v?\d+(\.\d+)*|\d+\.x(\.\d+)*)`
- `Node\.js.*(version\s*|v)?(\d+(\.\d+)*|\d+\.x(\.\d+)*)`
- `(LTS|Active|Maintenance).*(\d+\.\d+\.\d+|\d+\.x)`

**Simple text patterns:**
- `Node.js v[0-9]`
- `Node.js [0-9]`
- `nodejs [0-9]`
- `Node.js version`
- `node --version`



Date needed: 2025-07-02