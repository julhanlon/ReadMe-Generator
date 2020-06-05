//loading modules into the file
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

//section for variables
var userEmail = "";
var userPic = "";
var userInput = {};

//section for questions using inquirer
inquirer
  .prompt([
    { type: "input", message: "Enter your GitHub username", name: "username" },
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
      default: "no questions",
      when: (answers) => answers.questionConfirm === true,
    },
  ])
  .then((answers) => {
    userInput = answers;
    console.log("Answer:", answers);
    axios
      .get(`https://api.github.com/users/${answers.username}`)
      .then((response) => {
        console.log(response.data);
        userEmail = response.data.email;
        userPic = response.data.avatar_url;
        console.log(userEmail, userPic);
        fs.writeFile(
          "README.md",
          `# ${answers.title}
      
![license](https://img.shields.io/badge/License-${answers.license}-blue)

![userPic](${userPic})
    
![giphy]("./assests/readme_gen")
    
## Table of Contents
    - Description
    - Installation
    - Usage
    - Contributors 
    - Tests
    - Questions
    
## Description
    ${answers.description}
    
## How to install
    ${answers.install}

## Intended Usage
    ${answers.usage}

## Contributors
    ${answers.contributors}
    
## Tests
    ${answers.tests}
  
## Questions
    ${answers.questions}
  
Email:${userEmail}
    `,
          (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Sucess!");
            }
          }
        );
      });
  });
