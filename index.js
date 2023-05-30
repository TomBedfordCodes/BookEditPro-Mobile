import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://editbookpro-d9930-default-rtdb.europe-west1.firebasedatabase.app/"
}

// firebase
const app = initializeApp(appSettings)
const database = getDatabase(app)
const projectsInDB = ref(database, "projects")

// elements
const projnameInputEl = document.getElementById("projname-input")
const addBtn = document.getElementById("add-btn")
const projectsListEl = document.getElementById("projects-list")

// event listeners
addBtn.addEventListener("click", function() {
    if (!projnameInputEl.value) {
        return
    }
    addProject(projnameInputEl.value)
})


// functions
function addProject(projname) {
    projectsListEl.innerHTML += `<li>${projname}</li>`
    
}
