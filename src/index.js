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
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
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

// Returns the signed-in user's display name.
function getUserName() {
    return getAuth().currentUser.displayName;
  
  }

  // Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
    // TODO 4: Return the user's profile pic URL.
    return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
  
  }

  // Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
      return url + '?sz=150';
    }
    return url;
  }

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    let userName = document.getElementById("userName")
    let userPic = document.getElementById("user-pic")
    let signInWithGoogleButton = document.getElementById("signInWithGoogle");
    let signOutButton = document.getElementById("signOutButton")
    userName.textContent = getUserName();
    userName.hidden = false;

    // Set the user's profile pic and name.
    userPic.style.backgroundImage =
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userPic.hidden = false;
    signInWithGoogleButton.hidden = true;
    signOutButton.hidden = false;

  } else {
    // User is signed out!
    // Hide signOut Button and show the sign in with google button.
    signOutButton.hidden = true;
    signInWithGoogleButton.hidden = false;
}
}
// Initialize firebase auth
function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  }



  
  // Creates an instance of the google provider object
const provider = new GoogleAuthProvider();


function signInWithGoogleButtonClicked(){


    signInWithRedirect(auth, provider);
     let email = getRedirectResult(auth)
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
   
}

function signOutUser() {
    // Sign out of Firebase.
    console.log("user " + getAuth().currentUser.displayName + " signed out")
    signOut(getAuth());  
    let userName = document.getElementById("userName")
    let profilePic = document.getElementById("user-pic")
    let signInWithGoogleButton = document.getElementById("signInWithGoogle");
    let signOutButton = document.getElementById("signOutButton");  
    userName.hidden = true;
    profilePic.hidden = true;
  }
  





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

let userContainer = document.createElement("div");
userContainer.id = "userContainer"
header.appendChild(userContainer)

let userPic = document.createElement('div');
userPic.id = "user-pic"
userContainer.appendChild(userPic)

let userName = document.createElement("div");
userName.id = "userName"
userName.classList.add("userName");
userName.hidden = "true"
userContainer.appendChild(userName)


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
signInWithGoogleButton.id = "signInWithGoogle";
signInWithGoogleButton.textContent = "Sign In With Google";
signInWithGoogleButton.classList.add("signInWithGoogleButton")
signInWithGoogleButton.hidden = true;
signInWithGoogleButton.addEventListener("click", signInWithGoogleButtonClicked)
header.appendChild(signInWithGoogleButton)



// creates a button to sign out users
let signOutButton = document.createElement("div");
signOutButton.textContent = "Sign Out";
signOutButton.id = "signOutButton";
signOutButton.hidden = true;
signOutButton.classList.add("signInWithGoogleButton")
signOutButton.addEventListener("click", signOutUser)
header.appendChild(signOutButton)

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


    createToDoListPostItNotes(getAllProjectsArray);
    initFirebaseAuth();