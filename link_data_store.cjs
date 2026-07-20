const fs = require('fs');

const file = 'src/store/useAppStore.js';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Add new imports
  const importRegex = /import\s+\{\s*([^}]+)\s*\}\s*from\s*'\.\.\/utils\/mockData';/;
  const match = content.match(importRegex);
  
  if (match) {
    let importsStr = match[1];
    
    const newImports = [
      'generateStudents', 'generateAlumni', 'generateCompanies', 
      'generateAcademicStaff', 'initialPosts'
    ];
    
    newImports.forEach(imp => {
      if (!importsStr.includes(imp)) {
        importsStr += `, ${imp}`;
      }
    });
    
    content = content.replace(match[0], `import { \n  ${importsStr}\n} from '../utils/mockData';`);
  }

  // 2. Map state initialized values
  content = content.replace(/posts:\s*\[\],/g, 'posts: initialPosts,');
  
  // If there are existing `students: []` etc., replace them. But if they don't exist, we will have to find where to add them.
  // Wait, let's see how students are initialized.
  if (content.includes('students: [],')) {
    content = content.replace(/students:\s*\[\],/g, 'students: generateStudents(),');
  } else if (!content.includes('students: generateStudents(),')) {
    // Inject at the end of the state return block
    content = content.replace(/setGroups:\s*setter\('groups'\),/, "setGroups: setter('groups'),\n        students: generateStudents(),\n        setStudents: setter('students'),");
  }

  if (content.includes('alumni: [],')) {
    content = content.replace(/alumni:\s*\[\],/g, 'alumni: generateAlumni(),');
  } else if (!content.includes('alumni: generateAlumni(),')) {
    content = content.replace(/setStudents:\s*setter\('students'\),/, "setStudents: setter('students'),\n        alumni: generateAlumni(),\n        setAlumni: setter('alumni'),");
  }

  if (content.includes('academicStaff: [],')) {
    content = content.replace(/academicStaff:\s*\[\],/g, 'academicStaff: generateAcademicStaff(),');
  } else if (!content.includes('academicStaff: generateAcademicStaff(),')) {
    content = content.replace(/setAlumni:\s*setter\('alumni'\),/, "setAlumni: setter('alumni'),\n        academicStaff: generateAcademicStaff(),\n        setAcademicStaff: setter('academicStaff'),");
  }

  // Handle companies
  content = content.replace(/companies:\s*initialRealCompanies,/g, 'companies: generateCompanies(),');

  fs.writeFileSync(file, content);
  console.log('Linked mock data arrays to useAppStore.js successfully.');
}
