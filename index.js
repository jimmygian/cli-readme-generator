const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
// Custom Modules
const githubLicensesList = require('./utils/gitLicences');
const generateMarkdown = require("./utils/generateMarkdown");
const helper = require('./utils/helper');



// Store github Licence names
const githubLicenses = githubLicensesList.map(license => license.licenceName);

// Get the absolute path of the current working directory
const currentWorkingDir = path.resolve();





// array of questions for user
const questions = [
    
    // DIRECTORY (in which readme.md will be saved)
    {
        type: 'input',
        name: 'dir',
        message: 'Where should your readme file be saved?',
        default() {
            return currentWorkingDir;
        },
        validate(userPath) {
            // Normalize the path to handle platform-specific differences
            const absPath = helper.getAbsolutePath(userPath);

            if (absPath === null) {
                return `Please enter a valid absolute/relative directory.`;
            } else if (path.isAbsolute(absPath) && path.parse(absPath).root !== absPath) {
                return true;
            } else {
                return `Please enter a valid absolute/relative directory.`;
            }
        }
    },
    // GITHUB USERNAME
    {
        type: 'input',
        name: 'github_username',
        message: "What's your GitHub username?",
        validate(input) {
            if (helper.isGitHubUsername(input.trim())) {
                return true;
            }
            return "Please provide a correct github username."
        },
    },
    // EMAIL
    {
        type: 'input',
        name: 'email',
        message: "What's your email?",
        validate(input) {
            const trimmedInput = input.trim();

            if (trimmedInput === '') {
                // If the trimmed input is empty, allow the user to proceed
                return true;
            } else if (helper.isValidEmail(trimmedInput)) {
                return true;
            }
            return "Please provide a correct email or leave it blank.";
        }
    },
    // PROJECT TITLE
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
    // SHORT DESCRIPTION
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
    // LICENCE TYPE
    {
        type: 'list',
        name: 'licence',
        message: "Prefered licence type?",
        choices: [...githubLicenses],
    },
    // COMMANDS (for testing and installing dependences)
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
    // USAGE
    {
        type: 'input',
        name: 'usage',
        message: "Project usage:",
        default() {
            return "Clone project, run 'npm install' and then 'node index.js'."
        }
    },
    // COLLAB and CONTRIBUTIONS
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



// ** FUNCTIONS **


// function to write README file
function writeToFile(filePath, data) {

    fs.writeFile(filePath, generateMarkdown(data), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }

        // Extract the last part of the path
        const filename = path.basename(filePath);

        console.log(`${filename} has been generated successfully.`);
    });
}



// --------- INIT ----------

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

            const absDir = helper.getAbsolutePath(answers.dir);
            const constructedPath = path.normalize(`${absDir}/${camelCaseTitle}.md`)
            

            writeToFile(constructedPath, answers);
        })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.error(error);
    } else {
        // Something else went wrong
        console.error(error);
      }
    }); 
}

// function call to initialize program
init();

// --------- INIT ----------


