import { readFile, writeFile } from 'node:fs/promises';
import { glob } from 'glob';
import { format } from 'prettier';

const svgFiles = await glob('src/data/**/*.svg', { cwd: process.cwd() });

console.log(`Found ${svgFiles.length} SVG files to format`);

for (const file of svgFiles) {
  const content = await readFile(file, 'utf-8');
  
  try {
    const formatted = await format(content, {
      parser: 'html',
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      singleQuote: false,
      htmlWhitespaceSensitivity: 'ignore',
      endOfLine: 'lf',
    });
    
    await writeFile(file, formatted, 'utf-8');
    console.log(`✓ Formatted ${file}`);
  } catch (error) {
    console.error(`✗ Error formatting ${file}:`, error.message);
  }
}

console.log('Done!');
