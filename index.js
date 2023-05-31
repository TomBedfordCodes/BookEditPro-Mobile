import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"





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
    addProjectsToListEl(Object.values(snapshot.val()), projectsListEl)
})
}

if (appAddedProjectsListEl) {
    onValue(appAddedProjectsInDB, function(snapshot) {
        clearListEl(appAddedProjectsListEl)
        if (!snapshot.exists()) {
            return
        }
        addProjectsToListEl(Object.values(snapshot.val()), appAddedProjectsListEl)
    })
}



// event listeners
if (newProjBtn) {
    newProjBtn.addEventListener("click", function() {
        window.location = "/addproject.html"
    })
}



// functions
function addProjectsToListEl(projObjects, listEl) {
    let strHTML = ""
    for (let i = 0; i < projObjects.length; i++) {
        let currProjname = projObjects[i].projname
        // console.log(currProjname)
        // console.log()

        strHTML += `<li>${currProjname}</li>`
    }
    listEl.innerHTML = strHTML
}

function clearListEl(listEl) {
    listEl.innerHTML = ""
}

