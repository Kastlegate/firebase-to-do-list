import './style.css';
import './all.css';

import { getAllProjectsArray } from './toDoFunctions.js';
import { addProjectButtonClicked, 
    createToDoListPostItNotes, 
    createNewProjectButtonPressed 
} from './toDoListDom.js';
import { compareAsc, format } from 'date-fns'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    serverTimestamp,
  } from 'firebase/firestore';


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBc-taz8_wmgxYCiKwPvEJjQBnTKaZS2Gw",
  
    authDomain: "todolist-e6835.firebaseapp.com",
  
    projectId: "todolist-e6835",
  
    storageBucket: "todolist-e6835.appspot.com",
  
    messagingSenderId: "140539767501",
  
    appId: "1:140539767501:web:1d1522719dcde72f731784"
  
  };
  
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



  

// creates the header
let header = document.createElement("header");
    header.id = "header";
document.body.appendChild(header);
//container for the logo text and boxes
let logoContainer = document.createElement("div");
    logoContainer.id = "logoContainter";
    header.appendChild(logoContainer);

// creates the logo for the site
let logo = document.createElement("div");
    logo.id = "logo";
    logo.textContent = "To Do Lists";
    logoContainer.appendChild(logo);

    //container for the logo boxes
let logoBoxContainer = document.createElement("div")
    logoBoxContainer.id = "logoBoxContainer";
    logoContainer.appendChild(logoBoxContainer) 
    
let logoBoxTwo = document.createElement("div");
    logoBoxTwo.id = "logoBoxTwo";
    logoBoxTwo.className = "far fa-square";
    logoBoxContainer.appendChild(logoBoxTwo);
let logoBoxThree = document.createElement("div");
    logoBoxThree.id = "logoBoxThree";
    logoBoxThree.className = "far fa-check-square";
    logoBoxContainer.appendChild(logoBoxThree);




let createNewProject = document.createElement("div");
createNewProject.id = "createNewProject";
createNewProject.title = "Create New To Do List"
createNewProject.className = "fas fa-plus-circle"
createNewProject.addEventListener("click", createNewProjectButtonPressed)
document.body.appendChild(createNewProject);

// the main content of the page. A div that holds the navigation sidebar and the current project display
let mainContent = document.createElement("div");
    mainContent.id = "mainContent";
    document.body.appendChild(mainContent);

    let postItNoteContainerOne = document.createElement("div");
    postItNoteContainerOne.classList.add("postItNotesContainer");
    postItNoteContainerOne.id ="postItNoteContainerOne";
    mainContent.appendChild(postItNoteContainerOne);

let postItNoteContainerTwo = document.createElement("div");
    postItNoteContainerTwo.classList.add("postItNotesContainer");
    postItNoteContainerTwo.id="postItNoteContainerTwo"
    mainContent.appendChild(postItNoteContainerTwo);



    
//checks to see if locale storage has been used, and loads the previous saved data if so.
if (localStorage.getItem('projects'))
{
    console.log("storage is present")
    let projectsArray = JSON.parse(window.localStorage.getItem('projects'));
    console.log(projectsArray)
    setallProjects(projectsArray)
    createToDoListPostItNotes(getAllProjectsArray);
}

else{
    console.log("storage is not present")
    createToDoListPostItNotes(getAllProjectsArray);
}



// checks to see if local storage is available
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    console.log("Local storage is available");
  }
  else {
    console.log("Local storage is not available");
  }

//   localStorage.setItem('projects', JSON.stringify(getAllProjectsArray()))
  localStorage.removeItem('projects', JSON.stringify(getAllProjectsArray()))
  





    