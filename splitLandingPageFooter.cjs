const fs = require('fs');
const path = require('path');

const landingPagePath = path.join(__dirname, 'src', 'components', 'LandingPage.jsx');
let content = fs.readFileSync(landingPagePath, 'utf8');

// 1. Remove state
content = content.replace(/  const \[email, setEmail\] = useState\(''\);\n/, '');
content = content.replace(/  const \[isSubscribed, setIsSubscribed\] = useState\(false\);\n/, '');

// 2. Remove handleSubscribe
const handleSubRegex = /  const handleSubscribe = \(e\) => \{\n    e\.preventDefault\(\);\n    if\(email\) \{\n      setIsSubscribed\(true\);\n      setTimeout\(\(\) => \{\n        setIsSubscribed\(false\);\n        setEmail\(''\);\n      \}, 3000\);\n    \}\n  \};\n/;
content = content.replace(handleSubRegex, '');

// 3. Extract Footer HTML
const footerRegex = /      <footer className="bg-gelisim-primary py-16 relative overflow-hidden">[\s\S]*?<\/footer>/;
const footerMatch = content.match(footerRegex);

if (footerMatch) {
  const footerContent = `import React, { useState } from 'react';
import { ChevronRight, Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function Footer({ setSelectedItem, legalData, setView }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
${footerMatch[0].replace(/^      /gm, '    ')}
  );
}
`;

  fs.writeFileSync(path.join(__dirname, 'src', 'components', 'landing', 'Footer.jsx'), footerContent, 'utf8');

  // Replace footer in LandingPage
  content = content.replace(footerRegex, '      <Footer setSelectedItem={setSelectedItem} legalData={legalData} setView={setView} />');
}

// 4. Add import to LandingPage
content = content.replace(/(import HeroSlider from '.\/landing\/HeroSlider';)/, `$1\nimport Footer from './landing/Footer';`);

fs.writeFileSync(landingPagePath, content, 'utf8');
console.log('Successfully refactored LandingPage.jsx (Footer)!');
