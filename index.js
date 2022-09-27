const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const generateHTML = require("./src/generateHTML")

const questionsManager = [
    {
        type: "input",
        name: "name",
        message: "Enter manager's name:"
    },
    {
        type: "input",
        name: "id",
        message: "Enter manager's ID:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter manager's email:"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter manager's office number:"
    }
]

const options = [
    {
        type: "list",
        name: "teamOption",
        message: "Enter the next team member's role:",
        choices: ["Engineer", "Intern", "Don't add another member"]
    }
]

const questionsAll = [
    {
        type: "input",
        name: "name",
        message: "Enter team member's name:"
    },
    {
        type: "input",
        name: "id",
        message: "Enter team member's ID:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter team member's email:"

    }
]

const questionEngineer = [
    {
        type: "input",
        name: "github",
        message: "Enter team member's Github name:"
    }
]

const questionIntern = [
    {
        type: "input",
        name: "school",
        message: "Enter team member's school:"
    }
]

const team = []

function start() {
    inquirer
        .prompt(questionsManager)
        .then(addManager)
}

function addManager(managerAns) {
    let manager = new Manager(managerAns.name, managerAns.id, managerAns.email, managerAns.officeNumber)
    team.push(manager);
    next();
}

function next() {
    inquirer.prompt(options).then(cont => {
        if(cont.teamOption == "Engineer") {
            addEngineer()
        }
        else if(cont.teamOption == "Intern") {
            addIntern();
        }
        else {
            generatePage();
        }
    })
}

function addEngineer() {
    inquirer.prompt(questionsAll).then(engAns => {
        engineer = new Engineer(engAns.name, engAns.id, engAns.email)
        inquirer.prompt(questionEngineer).then(engAns2 => {
            engineer.github = engAns2.github;
            team.push(engineer);
            next();
        })
    })
}

function addIntern() {
    inquirer.prompt(questionsAll).then(intAns => {
        intern = new Intern(intAns.name, intAns.id, intAns.email)
        inquirer.prompt(questionIntern).then(intAns2 => {
            intern.school = intAns2.school;
            team.push(intern);
            next();
        })
    })
}

function generatePage() {
    fs.writeFile("./dist/my-team.html", generateHTML(team), (err) => err ? console.error(err) : console.log(`Profile at ./dist/my-team.html`))
}
start();
// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated