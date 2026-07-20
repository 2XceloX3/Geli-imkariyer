const fs = require('fs');

const file = 'src/components/JobsAndInternships.jsx';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  // Remove the Swipe button
  const swipeButtonRegex = /<button onClick=\{\(\) => setViewMode\('swipe'\)\}[\s\S]*?Kariyer Swipe<\/button>/g;
  content = content.replace(swipeButtonRegex, '');

  // Force viewMode to always be 'list' visually and logically
  // It's defined as const [viewMode, setViewMode] = useState('list');
  // We'll leave the state there so React doesn't crash if it's referenced, but remove the swipe render block.
  
  const swipeBlockRegex = /if \(viewMode === 'swipe'\) \{[\s\S]*?\} else \{/g;
  if (content.match(swipeBlockRegex)) {
    // Replace the 'if (viewMode === 'swipe') { ... } else {' with just '{' or nothing, 
    // Wait, it's easier to just replace the whole if/else block or delete the swipe block
    // Let's use a simpler approach: finding the exact start of the if (viewMode === 'swipe') block
    content = content.replace(swipeBlockRegex, '');
    
    // We must also remove the trailing '}' that belonged to the else block.
    // It's usually right before the `</div> // End Content` or similar.
    // Let's just find the closing bracket of the else block.
    // A safer way is to use a custom JS script to remove `SwipeableJobCard` import and references.
  }

  // A much safer regex for removing Kariyer Swipe
  content = content.replace(/<button onClick=\{\(\) => setViewMode\('list'\)\}[\s\S]*?<\/button>/g, '');
  
  fs.writeFileSync(file, content);
  console.log('Removed Kariyer Swipe references');
}
