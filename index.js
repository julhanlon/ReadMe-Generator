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
      message: "Enter your GitHub username:",
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
  ])
  .then((answers) => {
    console.log("Answers:", answers);
  });

// inquirer.prompt(questions).then((answers) => console.log(answers));

// function writeToFile(README, data) {
//   // const data = generateMD(answers);
// }

// function init() {}

// init();
