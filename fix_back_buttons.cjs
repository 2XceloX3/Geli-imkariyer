const fs = require('fs');
const path = require('path');

const target1 = "userRole === 'admin' ? 'admin' : userRole === 'employer' ? 'company' : userRole || 'landing'";
const target2 = "userRole === 'admin' ? 'admin' : userRole === 'employer' ? 'company' : userRole";

const replacement = "userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student'";

function replaceInFiles(dir) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) replaceInFiles(p);
    else if (p.endsWith('.jsx') || p.endsWith('.js')) {
      let content = fs.readFileSync(p, 'utf8');
      let changed = false;
      if (content.includes(target1)) {
        content = content.split(target1).join(replacement);
        changed = true;
      }
      if (content.includes(target2)) {
        content = content.split(target2).join(replacement);
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(p, content, 'utf8');
        console.log('Fixed back button in: ' + p);
      }
    }
  });
}

replaceInFiles('./src');
