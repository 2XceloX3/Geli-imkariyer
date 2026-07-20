const fs = require('fs');
const path = require('path');

const targetString = "previousView === 'academic' ? 'academic' : previousView === 'admin' ? 'admin' : previousView === 'student' ? 'student' : previousView === 'alumni' ? 'alumni' : previousView === 'company' ? 'company' : userRole === 'admin' ? 'admin' : userRole === 'employer' ? 'company' : userRole || 'landing'";

const replacementString = "previousView === 'academic' ? 'academic' : previousView === 'student' ? 'student' : previousView === 'alumni' ? 'alumni' : previousView === 'company' ? 'company' : userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student'";

function replaceInFiles(dir) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) replaceInFiles(p);
    else if (p.endsWith('.jsx') || p.endsWith('.js')) {
      let content = fs.readFileSync(p, 'utf8');
      if (content.includes(targetString)) {
        content = content.split(targetString).join(replacementString);
        fs.writeFileSync(p, content, 'utf8');
        console.log('Fixed in: ' + p);
      }
    }
  });
}

replaceInFiles('./src');
