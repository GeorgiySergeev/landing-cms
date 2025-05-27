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

// Fix paths in HTML content
function fixHtmlPaths(html, distDir, outputDir) {
  // Fix CSS file paths from /src/styles/
  html = html.replace(/href="\/src\/styles\/([^"]*\.css)"/g, (match, file) => {
    const sourcePath = path.join(rootDir, 'src', 'styles', file);
    if (fs.existsSync(sourcePath)) {
      const fileName = path.basename(file);
      const targetPath = path.join(outputDir, fileName);
      if (!fs.existsSync(targetPath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied CSS file: ${file} -> ${fileName}`);
      }
      return `href="${fileName}"`;
    }
    // If file doesn't exist, comment it out
    return `href="#" disabled`;
  });

  // Fix CSS file paths from /assets/
  html = html.replace(/href="\/assets\/([^"]*\.css)"/g, (match, file) => {
    const sourcePath = path.join(distDir, 'assets', file);
    if (fs.existsSync(sourcePath)) {
      const fileName = path.basename(file);
      const targetPath = path.join(outputDir, fileName);
      if (!fs.existsSync(targetPath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied CSS file: ${file} -> ${fileName}`);
      }
      return `href="${fileName}"`;
    }
    return match;
  });

  // Fix CSS file paths
  html = html.replace(/href="\/([^"]*\.css)"/g, (match, file) => {
    const sourcePath = path.join(distDir, file);
    if (fs.existsSync(sourcePath)) {
      const fileName = path.basename(file);
      const targetPath = path.join(outputDir, fileName);
      if (!fs.existsSync(targetPath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied CSS file: ${file} -> ${fileName}`);
      }
      return `href="${fileName}"`;
    }
    return match;
  });

  // Fix CSS paths with ./
  html = html.replace(/href="\/\.\/([^"]*\.css)"/g, 'href="$1"');

  // Fix image paths
  html = html.replace(
    /src="\/([^"]*\.(jpe?g|png|gif|webp|svg))"/g,
    (match, file) => {
      const sourcePath = path.join(distDir, file);
      if (fs.existsSync(sourcePath)) {
        const fileName = path.basename(file);
        const targetPath = path.join(outputDir, fileName);
        if (!fs.existsSync(targetPath)) {
          fs.copyFileSync(sourcePath, targetPath);
        }
        return `src="${fileName}"`;
      }
      return match;
    }
  );

  // Fix image paths with ./
  html = html.replace(
    /src="\/\.\/([^"]*\.(jpe?g|png|gif|webp|svg))"/g,
    'src="$1"'
  );

  // Fix CSS background-image paths
  html = html.replace(
    /background-image:\s*url\(\/([^)]+)\)/g,
    (match, file) => {
      const sourcePath = path.join(distDir, file);
      if (fs.existsSync(sourcePath)) {
        const fileName = path.basename(file);
        const targetPath = path.join(outputDir, fileName);
        if (!fs.existsSync(targetPath)) {
          fs.copyFileSync(sourcePath, targetPath);
        }
        return `background-image: url(${fileName})`;
      }
      // If file doesn't exist, replace with a placeholder
      return 'background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmOGY5ZmEiLz48L3N2Zz4=)';
    }
  );

  // Remove or comment out references to non-existent CSS files
  html = html.replace(/href="#" disabled/g, 'href="#" disabled');
  html = html.replace(
    /<link rel="stylesheet"\s+href="#" disabled>/g,
    '<!-- <link rel="stylesheet" href="#" disabled> -->'
  );

  // Fix onerror attributes for images
  html = html.replace(
    /onerror="this\.src='\/[^']*'; this\.onerror=null;"/g,
    'onerror="this.style.display=\'none\'; this.onerror=null;"'
  );

  // Fix script src paths
  html = html.replace(/src="\/([^"]*\.js)"/g, (match, file) => {
    const sourcePath = path.join(distDir, file);
    if (fs.existsSync(sourcePath)) {
      const fileName = path.basename(file);
      const targetPath = path.join(outputDir, fileName);
      if (!fs.existsSync(targetPath)) {
        fs.copyFileSync(sourcePath, targetPath);
      }
      return `src="${fileName}"`;
    }
    return match;
  });

  return html;
}

// Copy required assets from public directory
function copyPublicAssets(outputDir) {
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) return;

  // Copy common assets that might be referenced
  const commonAssets = [
    'images/flags/ng.svg',
    'images/flags/us.svg',
    'images/flags/uk.svg',
    'images/flags/de.svg',
    'images/flags/bd.svg',
    'images/flags/ar.svg',
    'images/flags/iq.svg',
    'images/product-image.png',
    'favicon.png',
    'apple-touch-icon.png',
  ];

  for (const asset of commonAssets) {
    const sourcePath = path.join(publicDir, asset);
    if (fs.existsSync(sourcePath)) {
      const fileName = path.basename(asset);
      const targetPath = path.join(outputDir, fileName);
      if (!fs.existsSync(targetPath)) {
        try {
          fs.copyFileSync(sourcePath, targetPath);
        } catch (error) {
          console.warn(`Could not copy ${asset}: ${error.message}`);
        }
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

  // Copy public assets first
  copyPublicAssets(outputDir);

  // Fix all paths in HTML
  html = fixHtmlPaths(html, distDir, outputDir);

  // Find and copy any remaining CSS and JS files referenced in HTML
  const cssMatches = html.match(/<link[^>]*href="([^"]*\.css)"[^>]*>/g) || [];
  const jsMatches = html.match(/<script[^>]*src="([^"]*\.js)"[^>]*>/g) || [];

  // Extract and copy CSS files
  for (const match of cssMatches) {
    const href = match.match(/href="([^"]*)"/)[1];
    if (
      !href.startsWith('http') &&
      !href.includes('#') &&
      href.endsWith('.css')
    ) {
      const sourcePath = path.join(
        distDir,
        href.startsWith('/') ? href.substring(1) : href
      );
      const targetPath = path.join(outputDir, path.basename(href));

      if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
        try {
          fs.copyFileSync(sourcePath, targetPath);
        } catch (error) {
          console.warn(`Could not copy CSS file ${href}: ${error.message}`);
        }
      }
    }
  }

  // Extract and copy JS files
  for (const match of jsMatches) {
    const src = match.match(/src="([^"]*)"/)[1];
    if (!src.startsWith('http') && src.endsWith('.js')) {
      const sourcePath = path.join(
        distDir,
        src.startsWith('/') ? src.substring(1) : src
      );
      const targetPath = path.join(outputDir, path.basename(src));

      if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
        try {
          fs.copyFileSync(sourcePath, targetPath);
        } catch (error) {
          console.warn(`Could not copy JS file ${src}: ${error.message}`);
        }
      }
    }
  }

  // Write the updated HTML file
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf-8');

  // Check file size
  const totalSize = calculateDirectorySize(outputDir);
  const sizeInKB = totalSize / 1024;
  console.log(`Total size: ${sizeInKB.toFixed(2)} KB`);
  if (sizeInKB > 100) {
    console.warn(
      `Warning: Size exceeds 100 KB limit (${sizeInKB.toFixed(2)} KB)`
    );
  }

  // Create a ZIP file
  try {
    const zipFileName = `${isolatedName}.zip`;
    const zipPath = path.join(isolatedDir, zipFileName);

    // Use a system command to create the ZIP file
    // For Windows
    if (process.platform === 'win32') {
      execSync(
        `powershell Compress-Archive -Path "${outputDir}\\*" -DestinationPath "${zipPath}" -Force`
      );
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
