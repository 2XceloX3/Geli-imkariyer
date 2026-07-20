const fs = require('fs');
const path = require('path');

const landingPagePath = path.join(__dirname, 'src', 'components', 'LandingPage.jsx');
let content = fs.readFileSync(landingPagePath, 'utf8');

// 1. Remove state
content = content.replace(/  const \[currentSlide, setCurrentSlide\] = useState\(0\);\n/, '');
content = content.replace(/  const \[isCarouselPaused, setIsCarouselPaused\] = useState\(false\);\n/, '');

// 2. Remove heroSlides def
content = content.replace(/  \/\/ Slider görselleri — kariyer\.gelisim\.edu\.tr ana slider'ından birebir alındı\n  const heroSlides = liveSliderData;\n/, '');

// 3. Remove useEffect
const useEffectRegex = /  useEffect\(\(\) => \{\n    if \(isCarouselPaused\) return;\n    const timer = setInterval\(\(\) => \{\n      setCurrentSlide\(\(prev\) => \(prev \+ 1\) % heroSlides\.length\);\n    \}, 5000\);\n    return \(\) => clearInterval\(timer\);\n  \}, \[isCarouselPaused, heroSlides\.length\]\);\n/;
content = content.replace(useEffectRegex, '');

// 4. Replace Hero Slider HTML with <HeroSlider />
const heroSliderRegex = /      \{\/\* Hero Slider Area \*\/\}[\s\S]*?<\/section>/;
content = content.replace(heroSliderRegex, '      <HeroSlider />');

// 5. Add import
content = content.replace(/(import Logo from '.\/Logo';)/, `$1\nimport HeroSlider from './landing/HeroSlider';`);

fs.writeFileSync(landingPagePath, content, 'utf8');
console.log('Successfully refactored LandingPage.jsx (HeroSlider)!');
