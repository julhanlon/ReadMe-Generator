const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
// const generateMD = require("./generateMarkdown");

inquirer
  .prompt([
    {
      type: "input",
      message: "Enter your Github username",
      name: "username",
    },
    {
      type: "input",
      message: "Enter project title",
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
      type: "confirm",
      message: "What is your question?",
      name: "questions",
      when: (answers) => answers.questionConfirm === true,
    },
  ])
  .then(({ username }) => {
    const searchUrl = `https://api.github.com/users/${username}`;
    axios.get(searchUrl).then((res) => {
      let userPic = res.data.avatar_url;
      let userEmail = res.data.email;
      if (userEmail === null) {
        userEmail = "No email";
      }
    });
  })
  .then((res) => {
    fs.writeFile(
      "README.md",
      `# ${res.title}
          ![license](https://img.shields.io/badge/License-${res.license}-blue)
          ***
    ![userPic](${res.userPic})
    ***
    email: ${res.userEmail}
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
    ***`
    );
  })
  .catch((error) => console.log(error));
