
import { test, expect, beforeAll, afterAll, describe } from 'vitest';
import { scanMarkdownFile } from './scanner.js';
import { promises as fs } from 'fs';
import path from 'path';

describe('Node.js version reference scanner', () => {
  const testFile = path.join(__dirname, 'test.md');
  const positiveCases = [
    'Node.js driver | 2.1.1',
    'Node.js v18',
    'Node.js v20',
    'Node.js 12',
    'Node.js 14',
    'Node.js 16',
    'Node.js 18',
    'Node.js 20',
    'Node.js 22',
    'Node.js version 8.0 or later',
    'Node.js 8.0.0 or higher',
    'Node.js v4.0+',
    'Node.js v4.0 or above',
    'Node.js version 10.0.x or later',
    'Node.js version 12 or later',
    'Node.js 14.x',
    'Node.js 16.x.x',
    'Node.js 18.x.x',
    'Node.js 20.x',
    'Node.js 22.x',
    'Node.js version 8.11.10',
    'Node.js versions 16.x.x',
    'Node.js v10.16.0',
    'Node.js v20.14.0',
    'Node.js v16.13.1',
    'Node.js v18.18.0',
    'Node.js v18.19.1',
    'Node.js (16.14.2 and above)',
    'Node.js (~14)',
    'Node.js 8.11.1 and 10.14.1 are recommended',
    'Node.js 12.18.4 and above',
    'Node.js 16.20 or higher',
    'Node.js version 20.0 or later',
    'Node.js 18 or later',
    'Node.js 12.x | Linux | 3.x',
    'Node.js 14.x | Linux | 4.x',
    'node:12',
    'node:14',
    'node:16',
    'node:18',
    'node:20',
    'Node.js 12, Node.js 14, Node.js 16, Node.js 18, Node.js 20 (preview)',
    '**Node.js 18 or later** installed on your computer. You can download Node.js from the [official website](https://nodejs.org/).',
    'Install [Node.js](https://nodejs.org) and NPM (verified with Node.js v14.16.0 and NPM 6.14.11).',
    'Install [Node.js](https://nodejs.org) and npm (verified with Node.js v14.16.0 and npm 6.14.11).',
    'Fixed custom domain resolution not working with Node.js v22 or newer.',
    'Changed Node.js to version v16.13.0',
    'Node.js 16.2.0',
    'Node.js v16.13.1 LTS',
    'Node.js v18.18.0 LTS',
    'Node.js Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 recommended)',
    '[Current Node.js v14 LTS or later](https://nodejs.org/)',
    '[Node.js](https://nodejs.org/) v14 LTS or later',
    '[Node.js](https://nodejs.org/) v16 LTS'
  ];
  const ltsCases = [
    'Node.js, Active LTS and Maintenance LTS versions',
    'Node.js LTS',
    'Node.js (LTS)',
    'Node.js long term support (LTS)',
    'Node.js LTS versions',
    'Node.js LTS releases',
    'Node.js LTS release',
    'Node long term',
    'Node.js v3 programming model',
    'Node.js v4 programming model',
    'npm install azure-storage@2.7.0',
    'node --version',
  ];
 


  beforeAll(async () => {
    const allCases = positiveCases.concat(ltsCases);
    await fs.writeFile(testFile, allCases.join('\n'), 'utf-8');
  });


  afterAll(async () => {
    await fs.unlink(testFile);
  });

  test('matches all positive (non-LTS) Node.js version references', async () => {
    const matches = await scanMarkdownFile(testFile);
    console.log('Matches:', matches);
    const passed: string[] = [];
    const failed: string[] = [];
    for (const str of positiveCases) {
      if (matches.some(m => m.toLowerCase().includes(str.toLowerCase()))) {
        passed.push(str);
      } else {
        failed.push(str);
      }
    }
    console.log('--- Positive Cases should find---');
    passed.forEach(str => console.log(`✅ ${str}`));
    failed.forEach(str => console.error(`❌ ${str}`));
    expect(failed).toEqual([]);
  });

  test('does not match LTS/negative cases', async () => {
    const matches = await scanMarkdownFile(testFile);
    const passed: string[] = [];
    const failed: string[] = [];
    for (const str of ltsCases) {
      if (matches.some(m => m.toLowerCase().includes(str.toLowerCase()))) {
        failed.push(str);
      } else {
        passed.push(str);
      }
    }
    console.log('--- LTS/Negative Cases should not find ---');
    passed.forEach(str => console.log(`✅ ${str}`));
    failed.forEach(str => console.error(`❌ ${str}`));
    expect(failed).toEqual([]);
  });
});
