import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { execSync } from 'child_process';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const isolatedDir = path.join(rootDir, 'dist-isolated');

// Create the isolated directory if it doesn't exist
if (!fs.existsSync(isolatedDir)) {
  fs.mkdirSync(isolatedDir, { recursive: true });
}

// Find all landing pages
const landingPagesDir = path.join(distDir, 'landing');
if (!fs.existsSync(landingPagesDir)) {
  console.error('Landing pages directory not found. Run astro build first.');
  process.exit(1);
}

// Process each landing page
function processLandingPages(dir, level = 0) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (level === 4 && entry.name.startsWith('[') === false) {
        // This is a variant directory, so we should process it as a landing page
        processLandingPage(fullPath);
      } else {
        // Continue traversing directories
        processLandingPages(fullPath, level + 1);
      }
    }
  }
}

// Process a single landing page
function processLandingPage(landingDir) {
  // Extract country, language, article, and variant from the path
  const pathParts = landingDir.split(path.sep);
  const variant = pathParts.pop();
  const article = pathParts.pop();
  const language = pathParts.pop();
  const country = pathParts.pop();
  
  const isolatedName = `${country}-${language}-${article}-${variant}`;
  const outputDir = path.join(isolatedDir, isolatedName);
  
  console.log(`Processing landing page: ${isolatedName}`);
  
  // Create isolated directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Read the HTML file
  const indexPath = path.join(landingDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`Index file not found for ${isolatedName}`);
    return;
  }
  
  let html = fs.readFileSync(indexPath, 'utf-8');
  
  // Find all CSS and JS references
  const cssMatches = html.match(/<link[^>]*href="([^"]*\.css)"[^>]*>/g) || [];
  const jsMatches = html.match(/<script[^>]*src="([^"]*\.js)"[^>]*>/g) || [];
  const imageMatches = html.match(/<img[^>]*src="([^"]*\.(jpe?g|png|gif|webp|svg))"[^>]*>/g) || [];
  
  // Extract paths
  const cssFiles = cssMatches.map(match => {
    const href = match.match(/href="([^"]*)"/)[1];
    return path.isAbsolute(href) ? href.substring(1) : href;
  });
  
  const jsFiles = jsMatches.map(match => {
    const src = match.match(/src="([^"]*)"/)[1];
    return path.isAbsolute(src) ? src.substring(1) : src;
  });
  
  const imageFiles = imageMatches.map(match => {
    const src = match.match(/src="([^"]*)"/)[1];
    return path.isAbsolute(src) ? src.substring(1) : src;
  }).filter(src => !src.startsWith('http') && !src.startsWith('data:'));
  
  // Copy all required files
  const allFiles = [...cssFiles, ...jsFiles, ...imageFiles];
  for (const file of allFiles) {
    try {
      const sourcePath = path.join(distDir, file);
      const targetPath = path.join(outputDir, path.basename(file));
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        
        // Update references in HTML
        html = html.replace(new RegExp(file, 'g'), `./${path.basename(file)}`);
      } else {
        console.warn(`File not found: ${sourcePath}`);
      }
    } catch (error) {
      console.error(`Error copying file ${file}: ${error.message}`);
    }
  }
  
  // Write the updated HTML file
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf-8');
  
  // Check file size
  const totalSize = calculateDirectorySize(outputDir);
  const sizeInKB = totalSize / 1024;
  console.log(`Total size: ${sizeInKB.toFixed(2)} KB`);
  if (sizeInKB > 100) {
    console.warn(`Warning: Size exceeds 100 KB limit (${sizeInKB.toFixed(2)} KB)`);
  }
  
  // Create a ZIP file
  try {
    const zipFileName = `${isolatedName}.zip`;
    const zipPath = path.join(isolatedDir, zipFileName);
    
    // Use a system command to create the ZIP file
    // For Windows
    if (process.platform === 'win32') {
      execSync(`powershell Compress-Archive -Path "${outputDir}\\*" -DestinationPath "${zipPath}" -Force`);
    } else {
      // For Unix/Linux/Mac
      execSync(`cd "${outputDir}" && zip -r "${zipPath}" ./*`);
    }
    
    console.log(`Created ZIP file: ${zipFileName}`);
  } catch (error) {
    console.error(`Error creating ZIP file: ${error.message}`);
  }
}

// Calculate the total size of a directory in bytes
function calculateDirectorySize(directory) {
  let totalSize = 0;
  const items = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      totalSize += calculateDirectorySize(fullPath);
    } else {
      totalSize += fs.statSync(fullPath).size;
    }
  }
  
  return totalSize;
}

// Start processing
processLandingPages(landingPagesDir);
console.log('All landing pages processed successfully!');

// Report the number of isolated builds
const isolatedBuilds = fs.readdirSync(isolatedDir).filter(item => {
  return fs.statSync(path.join(isolatedDir, item)).isDirectory();
});
console.log(`Total isolated builds: ${isolatedBuilds.length}`); 