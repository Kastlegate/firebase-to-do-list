// imports from the to do list files
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
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithRedirect, 
    getRedirectResult, 
    GoogleAuthProvider
      } from "firebase/auth";
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
const db = getFirestore(app);


// Creates an instance of the google provider object
const provider = new GoogleAuthProvider();

function signInWithGoogleButtonClicked(){


    signInWithRedirect(auth, provider);

    
}


getRedirectResult(auth)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });




// let email = "email";
// let password = "password";
// // function to create the user from their email and password
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

//   // creates the sign in funtcion
//   async function signIn() {
//     // Sign in Firebase using popup auth and Google as the identity provider.
//     var provider = new GoogleAuthProvider();
//     await signInWithPopup(getAuth(), provider);
//   }
  

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


let signInWithGoogleButton = document.createElement("div");
signInWithGoogleButton.textContent = "Sign In With Google";
signInWithGoogleButton.classList.add("signInWithGoogleButton")
signInWithGoogleButton.addEventListener("click", signInWithGoogleButtonClicked)
header.appendChild(signInWithGoogleButton)

// //Creates a form to sign up a new user
// let signUpForm = document.createElement("form");
// signUpForm.classList.add("signUpForm")
// header.appendChild(signUpForm)

// let signUpEmail = document.createElement("input");
// signUpEmail.id = "signUpEmail";
// let signUpEmailLabel = document.createElement("label");
// signUpEmailLabel.setAttribute("for", "signUpEmail")
// signUpEmail.type = "email";
// signUpEmailLabel.textContent = "Email: ";
// signUpEmailLabel.classList.add("label");
// signUpEmail.placeholder = "Email"
// signUpEmail.classList.add("email")
// //adds the email label and input to the form
// signUpForm.appendChild(signUpEmailLabel)
// signUpForm.appendChild(signUpEmail)

// let signUpPassword = document.createElement("input");
// signUpPassword.id = "signUpEmail";
// let signUpPasswordLabel = document.createElement("label");
// signUpPasswordLabel.setAttribute("for", "signUpPassword")
// signUpPassword.type = "password";
// signUpPasswordLabel.textContent = "Password: ";
// signUpPasswordLabel.classList.add("label");
// signUpPassword.placeholder = "Password"
// signUpPassword.classList.add("email")
// //adds the email label and input to the form
// signUpForm.appendChild(signUpPasswordLabel)
// signUpForm.appendChild(signUpPassword)

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
  





    