// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.project_name.trim()}

  ![License](https://img.shields.io/badge/license-${data.licence.trim()}-brightgreen)
  
  ## Description
  
  ${data.project_desc.trim()}  
  

  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tests](#tests)
  - [Contributing](#contributing)
  - [License](#license)
  - [Questions](#questions)
  

  ## Installation
  
  To install the necessary dependencies, run the command: 

  \`\`\`
  ${data.dep_command.trim()}
  \`\`\`


  ## Usage

  ${data.usage.trim()}
  

  ## Tests
  
  To run tests, use the command: 
  
  \`\`\`
  ${data.test_command.trim()}
  \`\`\`


  ## Contributing

  ${data.contributions.trim()}
  

  ## License
  
  This project is licensed under the [${data.licence.trim()}](LICENSE) license.
  

  ## Questions
  
  If you have any questions or concerns, please feel free to reach out to me:
  
  - GitHub: [${data.github_username.trim()}](https://github.com/${data.github_username.trim()})
  - Email: ${data.email.trim()}

  `;
}



module.exports = generateMarkdown;
