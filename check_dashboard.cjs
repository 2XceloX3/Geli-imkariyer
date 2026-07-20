const fs = require('fs');

let content = fs.readFileSync('src/components/AdminDashboard.jsx', 'utf8');

// The corrupted top: lines 1 to 41 is the misplaced renderPanel
const importsStart = content.indexOf("import CMSEvents from './admin/CMSEvents';");
if (importsStart === -1) {
  console.log("Could not find imports.");
  process.exit(1);
}

// Extract imports and panels up to AdminDashboard
const afterImports = content.substring(importsStart);
const componentStart = afterImports.indexOf("export default function AdminDashboard");

let topImports = `import React, { useState, useMemo } from 'react';
import useAppStore from '../store/useAppStore';
import TopProfileMenu from './TopProfileMenu';

import { Megaphone, Star } from 'lucide-react';
`;

let bodyText = "";
if (componentStart !== -1) {
    bodyText = afterImports.substring(0, componentStart);
    // ... wait, I've destroyed "export default function AdminDashboard" entirely!
} else {
    // I deleted export default function AdminDashboard!
}
