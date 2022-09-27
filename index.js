//packages
const inquirer = require("inquirer");
const fs = require("fs");

//classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const generateHTML = require("./src/generateHTML")

//manager questions
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

//next entry options
const options = [
    {
        type: "list",
        name: "teamOption",
        message: "Enter the next team member's role:",
        choices: ["Engineer", "Intern", "Don't add another member"]
    }
]

//questions for both engineer and intern
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

//engineer question
const questionEngineer = [
    {
        type: "input",
        name: "github",
        message: "Enter team member's Github name:"
    }
]

//intern question
const questionIntern = [
    {
        type: "input",
        name: "school",
        message: "Enter team member's school:"
    }
]

const team = []

//start app with manager questions
function start() {
    inquirer
        .prompt(questionsManager)
        .then(addManager)
}

//add manager to team
function addManager(managerAns) {
    let manager = new Manager(managerAns.name, managerAns.id, managerAns.email, managerAns.officeNumber)
    team.push(manager);
    next();
}

//determine next entry or end and generate file
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

//enter engineer
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

//enter intern
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

//generate html file
function generatePage() {
    fs.writeFile("./dist/my-team.html", generateHTML(team), (err) => err ? console.error(err) : console.log(`Profile at ./dist/my-team.html`))
}

start();
