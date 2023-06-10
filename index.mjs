import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { loadProjectDetails } from "./projdetails.mjs"



// HTML elements
const newProjBtn = document.getElementById("new-proj-btn")
const projectsListEl = document.getElementById("projects-list")
const appAddedProjectsListEl = document.getElementById("app-added-projects-list")




// firebase
const appSettings = {
    databaseURL: "https://editbookpro-d9930-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const projectsInDB = ref(database, "projects")
export const appAddedProjectsInDB = ref(database, "appAddedProjects")


if (projectsListEl) {
onValue(projectsInDB, function(snapshot) {
    clearListEl(projectsListEl)
    if (!snapshot.exists()) {
        return
    }
    addProjectsToListEl(Object.entries(snapshot.val()), projectsListEl)
})
}

if (appAddedProjectsListEl) {
    onValue(appAddedProjectsInDB, function(snapshot) {
        clearListEl(appAddedProjectsListEl)
        if (!snapshot.exists()) {
            return
        }
        addProjectsToListEl(Object.entries(snapshot.val()), appAddedProjectsListEl)
    })
}



// event listeners
if (newProjBtn) {
    newProjBtn.addEventListener("click", function() {
        window.location = "./addproject.html"
    })
}



// functions
function addProjectsToListEl(projObjects, listEl) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let statusColors = {
        "done": "",
        "inv_not_sent": "",
        "with_authors": "",
        "current": "#ce1d1d",
        "ready": "#f0781c",
        "draft": "#808080",
    }
    // sort list of projObjects by date
    projObjects.sort((a, b) => a[1].deadline.localeCompare(b[1].deadline))
    // then sort by status
    let priorityArr = Object.keys(statusColors)
    projObjects.sort( ( a, b ) => priorityArr.indexOf(a[1].status) - priorityArr.indexOf(b[1].status) )
    for (let i = 0; i < projObjects.length; i++) {
        let currProjID = projObjects[i][0]
        let currProjObj = projObjects[i][1]
        // retrieve projObj details
        let currPub = currProjObj.pub
        let currFee = currProjObj.fee
        let currDeadline = currProjObj.deadline
        let deadlineArr = currDeadline.split("-")
        let formattedDatestr = `${deadlineArr[2]} ${months[deadlineArr[1] - 1]} ${deadlineArr[0].slice(-2)}`
        // Create list element
        let liEl = document.createElement("li")
        liEl.innerHTML = `
        <span>${currPub}</span>
        <span>£${currFee}</span>
        <span>${formattedDatestr}</span>`
        listEl.append(liEl)
        // Based on object's status, change colour of <li>
        liEl.style.backgroundColor = statusColors[currProjObj.status]
        liEl.addEventListener("click", function() {
            loadProjectDetails(currProjID)
        })
    }

}

function clearListEl(listEl) {
    listEl.innerHTML = ""
}

