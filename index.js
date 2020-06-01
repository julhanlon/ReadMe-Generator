const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
// const generateMD = require("./generateMarkdown");

inquirer
  .prompt({
    type: "input",
    message: "Enter your GitHub username",
    name: "username",
  })
  .then(function ({ username }) {
    const searchUrl = `https://api.github.com/users/${username}`;

    axios.get(searchUrl).then(function (res) {
      let userPic = res.data.avatar_url;
      let userEmail = res.data.email;
      if (userEmail === null) {
        userEmail = "No email";
      }
    });
  });

inquirer
  .prompt([
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
      type: "checkbox",
      message: "Select categories to include in Table of Contents",
      name: "table of contents",
      choices: [
        "Installation",
        "Usage",
        "License",
        "Contributing",
        "Tests",
        "Questions",
      ],
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
  .then(function (data) {
    console.log(
      data.title,
      data.desc,
      data.install,
      data.usage,
      data.license,
      data.contributors,
      data.tests,
      data.questionConfirm,
      data.questions
    );
    fs.writeFile(
      "ReadMe.md",
      `# ${data.title}
      ![license type](https://img.shields.io/badge/License-${data.license}-blue)
      <br>
![userPic](${userPic})<br>
email: ${userEmail}
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
${data.descriptionl}
***
## How to install
${data.install}
***
## Intended Usage
${data.usage}
***
## Contributors
${data.contributors}
***
## Tests
${data.tests}
***
## Questions
${data.questions}
***`,
      (error) => {
        if (error) {
          console.log(error);
        }
        console.log("ReadMe generated");
      }
    );
  });
