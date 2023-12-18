const fs = require("fs");
const path = require('path');


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

  module.exports = {
    isGitHubUsername,
    isValidEmail,
    getAbsolutePath
  }