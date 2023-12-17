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



// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'github_username',
        message: "What's your GitHub username?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What's your email?"
    },
    {
        type: 'input',
        name: 'project_name',
        message: "What's your project name?"
    },
    {
        type: 'input',
        name: 'project_desc',
        message: "Short project decription:"
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
function writeToFile(fileName, data) {

}

// function to initialize program
function init() {
    inquirer
    .prompt(questions)
    .then((answers) => {
      // Use user feedback for... whatever!!
      console.log(answers);
      console.log(generateMarkdown(answers));
    })
    // .catch((error) => {
    //   if (error.isTtyError) {
    //     // Prompt couldn't be rendered in the current environment
    //   } else {
    //     // Something else went wrong
    //   }
    // }); 
}

// function call to initialize program
init();
