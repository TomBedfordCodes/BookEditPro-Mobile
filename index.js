import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://editbookpro-d9930-default-rtdb.europe-west1.firebasedatabase.app/"
}

// firebase
const app = initializeApp(appSettings)
const database = getDatabase(app)
const projectsInDB = ref(database, "projects")

onValue(projectsInDB, function(snapshot) {
    clearProjectListEl()
    if (!snapshot.exists()) {
        return
    }
    addProjectsToListEl(Object.values(snapshot.val()))
}) 


// HTML elements
const projnameInputEl = document.getElementById("projname-input")
const addBtn = document.getElementById("add-btn")
const projectsListEl = document.getElementById("projects-list")


// event listeners
addBtn.addEventListener("click", function() {
    if (!projnameInputEl.value) {
        return
    }
    addProjectToDB(projnameInputEl.value)
    clearInputEl()
})


// functions
function addProjectToDB(projname) {
    push(projectsInDB, projname)
}

function clearInputEl() {
    projnameInputEl.value = ""
}

function addProjectsToListEl(projnames) {
    let strHTML = ""
    for (let i = 0; i < projnames.length; i++) {
        let currProjname = projnames[i]
        strHTML += `<li>${currProjname}</li>`
    }
    projectsListEl.innerHTML = strHTML
}

function clearProjectListEl() {
    projectsListEl.innerHTML = ""
}

