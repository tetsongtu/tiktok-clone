#!/usr/bin/env node

/**
 * Script to convert inline SVGs to Icon components
 * Usage: node scripts/convert-svgs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SVG patterns to icon names mapping
const svgToIcon = {
	// Upload icon
	'M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66-5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,113.37V24a8,8,0,0,0-16,0v89.37L93.66,87a8,8,0,0,0-11.32,11.32Z':
		'IconUpload',

	// Search icon
	'M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z':
		'IconSearch',

	// Close icon
	'M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z':
		'IconClose',

	// Heart icon
	'M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z':
		'IconHeart',

	// Spinner icon
	'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z':
		'IconSpinner',

	// Check circle icon
	'M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z':
		'IconCheckCircle',

	// User circle icon
	'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm0-144a56,56,0,0,0-56,56,8,8,0,0,1-16,0,72,72,0,1,1,72,72,8,8,0,0,1,0-16A56,56,0,0,0,128,72Z':
		'IconUserCircle',

	// Pencil icon
	'M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63Z':
		'IconPencil',

	// Share icon
	'M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35Z':
		'IconShare',

	// Caret right icon
	'M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z':
		'IconCaretRight',

	// Smiley icon
	'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a12,12,0,1,1-12-12A12,12,0,0,1,168,148Zm-56,0a12,12,0,1,1-12-12A12,12,0,0,1,112,148Zm76-28c0,35.82-29.47,52-68,52s-68-16.18-68-52a8,8,0,0,1,16,0c0,20.39,17.12,36,52,36s52-15.61,52-36a8,8,0,0,1,16,0Z':
		'IconSmiley',

	// Split vertical icon
	'M224,152a8,8,0,0,1-8,8H192v24a8,8,0,0,1-16,0V160H152a8,8,0,0,1,0-16h24V120a8,8,0,0,1,16,0v24h24A8,8,0,0,1,224,152ZM56,120H72v16a8,8,0,0,0,16,0V120h16a8,8,0,0,0,0-16H88V88a8,8,0,0,0-16,0v16H56a8,8,0,0,0,0,16ZM184,192H40V56H184a8,8,0,0,0,0-16H40A16,16,0,0,0,24,56V192a16,16,0,0,0,16,16H184a8,8,0,0,0,0-16Z':
		'IconSplitVertical',

	// Chart bar icon
	'M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16Z':
		'IconChartBar',

	// Info icon
	'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z':
		'IconInfo'
};

// Files to convert
const filesToConvert = [
	'src/routes/(header-only)/upload/+page.svelte',
	'src/routes/(default)/[nickname]/+page.svelte',
	'src/routes/(default)/+page.svelte',
	'src/lib/layouts/Search.svelte',
	'src/lib/layouts/MenuItem.svelte',
	'src/lib/features/ProfilePost.svelte',
	'src/lib/features/SuggestedAccounts.svelte',
	'src/lib/features/CommentDrawer.svelte',
	'src/lib/features/EditProfileModal.svelte',
	'src/lib/features/AuthModal.svelte',
	'src/lib/components/Menu.svelte',
	'src/lib/components/ActionButton.svelte'
];

function convertFile(filePath) {
	const fullPath = path.join(__dirname, '..', filePath);
	let content = fs.readFileSync(fullPath, 'utf-8');
	let modified = false;
	const iconsUsed = new Set();

	// Find all SVG elements and their paths
	const svgRegex = /<svg[^>]*>([\s\S]*?)<\/svg>/g;
	let match;

	while ((match = svgRegex.exec(content)) !== null) {
		const svgContent = match[0];
		const pathMatch = svgContent.match(/d="([^"]+)"/);

		if (pathMatch) {
			const pathData = pathMatch[1];
			const iconName = svgToIcon[pathData];

			if (iconName) {
				// Extract classes
				const classMatch = svgContent.match(/class="([^"]+)"/);
				const classes = classMatch ? classMatch[1] : 'w-6 h-6';

				// Replace SVG with Icon component
				const replacement = `<${iconName} class="${classes}" />`;
				content = content.replace(svgContent, replacement);
				iconsUsed.add(iconName);
				modified = true;
			}
		}
	}

	if (modified) {
		// Add import statement if not exists
		const importStatement = `import { ${Array.from(iconsUsed).join(', ')} } from '~/lib/components/icons';`;

		if (!content.includes('from \'~/lib/components/icons\'')) {
			// Find script tag and add import
			content = content.replace(
				/<script lang="ts">/,
				`<script lang="ts">\n\t${importStatement}`
			);
		} else {
			// Update existing import
			content = content.replace(
				/import \{([^}]+)\} from '~\/lib\/components\/icons';/,
				(match, existingIcons) => {
					const allIcons = new Set([
						...existingIcons.split(',').map((i) => i.trim()),
						...Array.from(iconsUsed)
					]);
					return `import { ${Array.from(allIcons).join(', ')} } from '~/lib/components/icons';`;
				}
			);
		}

		fs.writeFileSync(fullPath, content, 'utf-8');
		console.log(`✅ Converted ${filePath} - Used icons: ${Array.from(iconsUsed).join(', ')}`);
	} else {
		console.log(`⏭️  Skipped ${filePath} - No matching SVGs found`);
	}
}

console.log('🚀 Starting SVG to Icon conversion...\n');

filesToConvert.forEach((file) => {
	try {
		convertFile(file);
	} catch (error) {
		console.error(`❌ Error converting ${file}:`, error.message);
	}
});

console.log('\n✨ Conversion complete!');
