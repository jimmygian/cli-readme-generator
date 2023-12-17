// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.project_name}

  ![License](https://img.shields.io/badge/license-${data.licence}-brightgreen)
  
  ## Description
  
  ${data.project_desc}  
  

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
  ${data.dep_command}
  \`\`\`


  ## Usage

  ${data.usage}
  

  ## Tests
  
  To run tests, use the command: \`${data.test_command}\`


  ## Contributing

  ${data.contributions}
  

  ## License
  
  This project is licensed under the [${data.licence}](LICENSE) license.
  

  ## Questions
  
  If you have any questions or concerns, please feel free to reach out to me:
  
  - GitHub: [${data.github_username}](https://github.com/${data.github_username})
  - Email: ${data.email}

  `;
}



module.exports = generateMarkdown;
