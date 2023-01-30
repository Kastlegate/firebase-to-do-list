import { initializeApp } from "firebase/app";
import { getAllProjectsArray, getIndividualProject, addProject, addTask, removeTask } from "./toDoFunctions";
import { addProjectButtonClicked, 
    createToDoListPostItNotes, 
    createNewProjectButtonPressed 
} from './toDoListDom.js';
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
    getDoc,
    limit,
    newId,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    docs,
    getDocs,
    collectionGroup,
    serverTimestamp,
  } from 'firebase/firestore';

  const firebaseConfig = {

    apiKey: "AIzaSyBc-taz8_wmgxYCiKwPvEJjQBnTKaZS2Gw",
  
    authDomain: "todolist-e6835.firebaseapp.com",
  
    projectId: "todolist-e6835",
  
    storageBucket: "todolist-e6835.appspot.com",
  
    messagingSenderId: "140539767501",
  
    appId: "1:140539767501:web:1d1522719dcde72f731784"
  
  };
  
  
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore (the database) and get a reference to the service
const db = getFirestore();

  // Returns the signed-in user's display name.
  function getUserEmail() {
    return getAuth().currentUser.email;
  }

//recieves a document id (or undefined, if the document doesn't exist yet) and the value from the title input
function updateTitleInDatabase(id, value){

  if (id === "undefined"){

    // addDoc will add a new document with a generated id for firestore.
  const docRef = addDoc(collection(db, getUserEmail()), {
    title: value,
    tasks: [],
    completedTasks: []
  });
  }
  else if(id !== "undefined"){
    //creates a reference to this doc
    const getRef = doc(db, getUserEmail(), id);
    // updates the doc with the new title value
    updateDoc(doc(db, getUserEmail(), getRef.id), {
      title: value
      });
  }  
}


//recieves either an id from 
function updateTasksInDatabase(id, array, index, value){


  //creates a reference to this doc
  const getRef = doc(db, getUserEmail(), id);

  
  // console.log(getIndividualProject(array).tasksArray[index].tasks)
  // getIndividualProject(array).tasksArray[index].tasks = value;
  console.log(getIndividualProject(array).tasksArray[index])
  let taskOnlyArray = [];
  getIndividualProject(array).tasksArray.forEach(element =>{
    taskOnlyArray.push(element.tasks)
  })


    // updates the doc with the new title value
    updateDoc(doc(db, getUserEmail(), getRef.id), {
      tasks: taskOnlyArray,
      });




  // if (tasks === "undefined"){


  // }
  // else if(tasks !== "undefined"){

  // }  
}

function grabFromTheDatabase(ref) {
    const collectionRef = collection(db, ref);
    
    getDocs(collectionRef)
        .then((snapshot) => {
          
          let index = 0;
          snapshot.docs.forEach((docSnapshot) => {
 
            addProject(docSnapshot.data().title, '',  docSnapshot.id)
  
            let tasks = docSnapshot.data().tasks;
            if(docSnapshot.data().tasks)
            {
              docSnapshot.data().tasks.forEach(element => {
                addTask(getIndividualProject(index), element)
                docSnapshot.data().tasks = tasks;
              })
            }
  
            //create completed tasks lists
            if (docSnapshot.data().completedTasks)
            {
              docSnapshot.data().completedTasks.forEach(element => {
                removeTask(getIndividualProject(index), element)
              })
            }
            ++index
            // createToDoListPostItNotes(getAllProjectsArray);
          })
          
  
          createToDoListPostItNotes()
          
        })
        .catch(err => {
          console.log(err.message)
        })
  
  
  }



  export { grabFromTheDatabase, getUserEmail, updateTitleInDatabase, updateTasksInDatabase }