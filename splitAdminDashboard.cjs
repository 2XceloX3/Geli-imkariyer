const fs = require('fs');
const path = require('path');

const adminDashboardPath = path.join(__dirname, 'src', 'components', 'AdminDashboard.jsx');
let content = fs.readFileSync(adminDashboardPath, 'utf8');

// The panels to remove
const overviewStart = "// ── 1. Kontrol Merkezi ────────────────────────────────────────";
const overviewEndRegex = /function OverviewPanel[\s\S]*?\}\n(?=\/\/ ── 2\. Operasyon Özeti)/;

const operasyonEndRegex = /function OperasyonPanel[\s\S]*?\}\n(?=\/\/ ── 3\. Akademik Performans)/;

const akademikEndRegex = /function AkademikPanel[\s\S]*?\}\n(?=\n*\/\/ ══════════════════════════════════════════════════════════════\n\/\/  SIDEBAR NAVIGATION CONFIG)/;

const platformSettingsRegex = /function PlatformSettings[\s\S]*?\n\}/;

// Extract PlatformSettings content before deleting
const platformMatch = content.match(platformSettingsRegex);
if (platformMatch) {
    const platformContent = `import React from 'react';\nimport PanelHeader from './PanelHeader';\nimport { Card } from './AdminShared';\n\nexport default ${platformMatch[0]}`;
    fs.writeFileSync(path.join(__dirname, 'src', 'components', 'admin', 'PlatformSettings.jsx'), platformContent, 'utf8');
    content = content.replace(platformSettingsRegex, '');
}

// Remove Overview, Operasyon, Akademik
content = content.replace(overviewEndRegex, '');
content = content.replace(operasyonEndRegex, '');
content = content.replace(akademikEndRegex, '');

// Clean up their headers
content = content.replace(/\/\/ ── 1\. Kontrol Merkezi ────────────────────────────────────────\n/g, '');
content = content.replace(/\/\/ ── 2\. Operasyon Özeti ────────────────────────────────────────\n/g, '');
content = content.replace(/\/\/ ── 3\. Akademik Performans ────────────────────────────────────\n/g, '');

// Add imports
const imports = `import OverviewPanel from './admin/OverviewPanel';
import OperasyonPanel from './admin/OperasyonPanel';
import AkademikPanel from './admin/AkademikPanel';
import PlatformSettings from './admin/PlatformSettings';
`;

content = content.replace(/(import CMSClubs from '.\/admin\/CMSClubs';\nimport PanelHeader from '.\/admin\/PanelHeader';\nimport Logo from '.\/Logo';)/, `$1\n${imports}`);

fs.writeFileSync(adminDashboardPath, content, 'utf8');
console.log('Successfully refactored AdminDashboard.jsx!');
