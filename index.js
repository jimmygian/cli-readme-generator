const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// Project Licences
const githubLicenses = [
    'MIT License',
    'GNU General Public License v3.0',
    'Apache License 2.0',
    'BSD 2-Clause "Simplified" License',
    'BSD 3-Clause "New" or "Revised" License',
    'Creative Commons Zero v1.0 Universal (CC0)',
    'Mozilla Public License 2.0',
    'The Unlicense',
    'Eclipse Public License 2.0',
    'GNU Lesser General Public License v3.0'
];

// Get the absolute path of the current working directory
const currentWorkingDir = path.resolve();

// Count of Checking if the normalized path is absolute and valid
let errorCount = 0;

// array of questions for user
const questions = [
    {
        // DIRECTORY (in which readme.md will be saved)
        type: 'input',
        name: 'dir',
        message: 'Where should your readme file be saved?',
        default() {
            return currentWorkingDir;
        },
        validate(userPath) {
            // Normalize the path to handle platform-specific differences
            const absPath = getAbsolutePath(userPath);

            if (absPath === null) {
                return `Please enter a valid absolute/relative directory.`;
            } else if (path.isAbsolute(absPath) && path.parse(absPath).root !== absPath) {
                return true;
            } else {
                errorCount++;
                return `Please enter a valid absolute/relative directory.`;
            }
        }
    },
    {
        type: 'input',
        name: 'github_username',
        message: "What's your GitHub username?",
        validate(input) {
            if (isGitHubUsername(input.trim())) {
                return true;
            }
            return "Please provide a correct github username."
        },
    },
    {
        type: 'input',
        name: 'email',
        message: "What's your email?",
        validate(input) {
            const trimmedInput = input.trim();

            if (trimmedInput === '') {
                // If the trimmed input is empty, allow the user to proceed
                return true;
            } else if (isValidEmail(trimmedInput)) {
                return true;
            }
            return "Please provide a correct email or leave it blank.";
        }
    },
    {
        type: 'input',
        name: 'project_name',
        message: "What's your project title?",
        validate(input) {
            // Trim leading and trailing whitespaces
            const trimmedInput = input.trim();

            if (trimmedInput !== '') {
                return true;
            }
            return "Please provide a correct project title.";
        }
    },
    {
        type: 'input',
        name: 'project_desc',
        message: "Short project decription:",
        validate(input) {
            // Trim leading and trailing whitespaces
            const trimmedInput = input.trim();

            if (trimmedInput !== '') {
                return true;
            }
            return "Please provide a short description to proceed.";
        }
    },
    {
        type: 'list',
        name: 'licence',
        message: "Prefered licence type?",
        choices: [...githubLicenses],
    },
    {
        type: 'input',
        name: 'dep_command',
        message: "What command should be run to run dependencies?",
        default() {
            return "npm install"
        }
    },
    {
        type: 'input',
        name: 'test_command',
        message: "What command should be run to run tests?",
        default() {
            return "npm test"
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: "Usage:",
        default() {
            return "Run 'npm install' and then 'node index.js'."
        }
    },
    {
        type: 'input',
        name: 'collab',
        message: "What does the user need to know about using the repo?"
    },
    {
        type: 'input',
        name: 'contributions',
        message: "Contributions:"
    },
];

// function to write README file
function writeToFile(filePath, data) {

    fs.writeFile(filePath, generateMarkdown(data), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }

        // Extract the last part of the path
        const filename = path.basename(filePath);

        console.log(`${filename}.md has been generated successfully.`);
    });
}

// function to initialize program
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            // Convert Project Title to camelCase without spaces
            const projectTitle = answers.project_name;
            const titleRule = /[^a-zA-Z0-9]+(.)/g;
            const camelCaseTitle = projectTitle
                .toLowerCase()
                .replace(titleRule, (_, char) => char.toUpperCase());

            const absDir = getAbsolutePath(answers.dir);
            const constructedPath = path.normalize(`${absDir}/${camelCaseTitle}.md`)
            

            writeToFile(constructedPath, answers);
        })
    // .catch((error) => {
    //   if (error.isTtyError) {
    //     // Prompt couldn't be rendered in the current environment
    //   } else {
    //     // Something else went wrong
    //   }
    // }); 
}


function isGitHubUsername(input) {
    // GitHub username pattern: Only alphanumeric characters and hyphens allowed
    const githubUsernamePattern = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;

    return githubUsernamePattern.test(input);
}

function isValidEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
}

function getAbsolutePath(userPath) {
    // Check if the user provided an absolute path directly
    if (path.isAbsolute(userPath)) {
      try {
        // Check if the absolute path exists
        fs.accessSync(userPath, fs.constants.R_OK);
        return userPath; // Return the absolute path if it's valid and exists
      } catch (error) {
        return null; // Return null if the path is invalid or does not exist
      }
    }
  
    // Convert the relative path to an absolute path
    const absolutePath = path.resolve(process.cwd(), userPath);
  
    try {
      // Check if the absolute path exists
      fs.accessSync(absolutePath, fs.constants.R_OK);
      return absolutePath; // Return the absolute path if it's valid and exists
    } catch (error) {
      return null; // Return null if the path is invalid or does not exist
    }
  }

// function call to initialize program
init();
