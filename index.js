const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

var userEmail = "";
var userPic = "";

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
      when: (answers) => answers.questionConfirm === true,
    },
  ])
  .then(function ({ username }) {
    const gitUrl = `https://api.github.com/users/${username}`;
    const emailUrl = `https://api.github.com/users/${username}/events/public`;
    axios.get(gitUrl).then((res) => {
      userPic = res.data.avatar_url;
      axios
        .get(emailUrl)
        .then((res) => {
          userEmail = res.data.email;
          if (userEmail === null) {
            userEmail = "No user email";
          }
        })
        .then((res) => {
          console.log(res.title);
          console.log(res.description);
          console.log(res.installation);
          console.log(res.usage);
          console.log(res.license);
          console.log(res.contributors);
          console.log(res.tests);
          console.log(res.questionConfirm);
          console.log(res.questions);
          console.log(res.data.email);
          console.log(res.data.avatar_url);
        });
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
  })
  .catch((error) => console.log(error));
