const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

var userEmail = "";
var userPic = "";

inquirer
  .prompt({
    type: "input",
    message: "Enter your GitHub username",
    name: "username",
  })
  .then(({ username }) => {
    axios.get(`https://api.github.com/users/${username}`);
    return axios.get(`https://api.github.com/users/${username}`);
  })
  .then(function (res) {
    userPic = res.data.avatar_url;
    userEmail = res.data.email;
    if (userEmail === null) {
      userEmail = "No User Email";
    }
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter your project title",
          name: "title",
        },
        {
          type: "input",
          message: "Enter your project description",
          name: "description",
        },
        {
          type: "input",
          message: "What is the installation process?",
          name: "installation",
          default: "no install",
        },
        {
          type: "input",
          message: "What do you use this project for?",
          name: "usage",
        },
        {
          type: "list",
          message: "Choose a license",
          name: "license",
          choices: ["MIT", "Apache", "GPL", "Affero GPL"],
        },
        {
          type: "input",
          message: "who are the contributors",
          name: "contributors",
          default: "only me",
        },
        {
          type: "input",
          message: "What tests would you like to run?",
          name: "tests",
          default: "none",
        },
        {
          type: "confirm",
          message: "Do you have any questions?",
          name: "questionConfirm",
        },
        {
          type: "input",
          message: "What is your question?",
          name: "questions",
          when: (answers) => answers.questionConfirm === true,
        },
      ])
      .then((res) => {
        fs.writeFile(
          "README.md",
          `# ${res.title}
      ***
    ![license](https://img.shields.io/badge/License-${res.license}-blue)
      ***
    ![userPic](${userPic})
    ***
    ![giphy]("./")
    ***
    ## Table of Contents
    - Description
    - Installation
    - Usage
    - Contributors 
    - Tests
    - Questions
    ***
    ## Description
    ${res.descriptionl}
    ***
    ## How to install
    ${res.install}
    ***
    ## Intended Usage
    ${res.usage}
    ***
    ## Contributors
    ${res.contributors}
    ***
    ## Tests
    ${res.tests}
    ***
    ## Questions
    ${res.questions}
    ***
    Email:${userEmail}
    `
        );
      });
  })
  .catch((error) => console.log(error));
