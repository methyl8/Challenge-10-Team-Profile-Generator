const template = require("./template.js")
//create team member card
function createCard(teamMember) {
    return `<div class="card text-center m-2" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title bg-primary text-white"><p>${teamMember.name}</p>
                <p>${teamMember.role}</p></h5>
                  <p class="card-text">${teamMember.id}</p>
                  <a class="card-text d-block" href="mailto:${teamMember.email}">${teamMember.email}</a>
                  ${createDynamic(teamMember)}
                </div>
              </div>`
}

//create extra line by role
function createDynamic(teamMember) {
    switch (teamMember.role) {
        case "Manager":
            return `<p class="card-text">Office Number: ${teamMember.officeNumber}</p>`
        case "Engineer":
            return `<a href="https://github.com/${teamMember.github}" target="_blank">Github profile</a>`
        case "Intern":
            return `<p class="card-text">School: ${teamMember.school}</p>`
        default:
            return ``
    }
}

//create full html 
function generateHTML(team) {
    let returnText = ``
    returnText += template.top;
    for(let i = 0; i < team.length; i++) {
        returnText += createCard(team[i])
    }
    returnText += template.bottom;
    return returnText
}

module.exports = generateHTML;