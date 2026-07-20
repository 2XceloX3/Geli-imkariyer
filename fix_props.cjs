const fs = require('fs');
const files = [
  'StudentFeed.jsx', 'AlumniFeed.jsx', 'CompanyFeed.jsx', 'JobsAndInternships.jsx', 'AICVBuilder.jsx', 'MessagingInterface.jsx'
];
files.forEach(file => {
  const p = 'src/components/' + file;
  if (!fs.existsSync(p)) return;
  let text = fs.readFileSync(p, 'utf8');
  
  // Ensure useAppStore is imported
  if (!text.includes('useAppStore')) {
    text = "import useAppStore from '../store/useAppStore';\n" + text;
  }
  
  // Inject Zustand hooks if not present
  if (!text.includes('useAppStore(state => state.messages)')) {
    text = text.replace(/(export default function \w+\([^)]*\)\s*\{)/, "$1\n  const messages = useAppStore(state => state.messages);\n  const setMessages = useAppStore(state => state.setMessages);\n");
  }
  
  fs.writeFileSync(p, text, 'utf8');
  console.log('Fixed ' + file);
});
