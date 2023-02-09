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
    deleteDoc,
    updateDoc,
    doc,
    docs,
    getDocs,
    collectionGroup,
    serverTimestamp,
    Timestamp,
    
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
    completedTasks: [],
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
  
  grabFromTheDatabase(getUserEmail())
}


//recieves either an id from 
function editTasksInDatabase(id, array, index, value){

  //creates a reference to this doc
  const getRef = doc(db, getUserEmail(), id);
  let taskOnlyArray = [];
  getIndividualProject(array).tasksArray.forEach(element =>{
    if (element.tasks !== ""){
      taskOnlyArray.push(element.tasks)
    }
    
  })
  
    // updates the doc with the new to do list
    updateDoc(doc(db, getUserEmail(), getRef.id), {
      tasks: taskOnlyArray,
      });

}

// removes the tasks clicked from the tasks array field in firestore and add it to the completed tasks array field in firestore
function updateCompletedTasksInDatabase(id, array, index){

  //creates a reference to this doc
  const getRef = doc(db, getUserEmail(), id);
  // arrays to duplicate each task and completed tasks arrays from the dom
  let taskArray = [];
  let completedTaskArray = [];
  // task
  let taskGoingToCompletedTasks = getIndividualProject(array).tasksArray[index].tasks;

  //runs through each item in the individual arreay to populate the clone arrays
  getIndividualProject(array).tasksArray.forEach(element =>{
      taskArray.push(element.tasks)    
  })
  getIndividualProject(array).finishedTasksArray.forEach(element =>{   
      completedTaskArray.push(element.tasks)    
  })
  //adds the task slected for completion to the completed tasks array before being
  //added to the 
  completedTaskArray.push(taskGoingToCompletedTasks)
  //removes the selected task from the new array before using the new array in updateDoc  
      if (index > -1) {
      taskArray.splice(index, 1);
  }
    // updates the doc with the new to do list
    updateDoc(doc(db, getUserEmail(), getRef.id), {
      tasks: taskArray,
      completedTasks: completedTaskArray, 
      });

    

}

function updateTasksInDatabase(id, array, index){

  //creates a reference to this doc
  const getRef = doc(db, getUserEmail(), id);
  // arrays to duplicate each task and completed tasks arrays from the dom
  let taskArray = [];
  let completedTaskArray = [];
  // task
  let completedTaskGoingToTasks = getIndividualProject(array).finishedTasksArray[index].tasks;
  getIndividualProject(array).tasksArray.forEach(element =>{
    
      taskArray.push(element.tasks)
  }) 
  getIndividualProject(array).finishedTasksArray.forEach(element =>{
    
      completedTaskArray.push(element.tasks)
    
  })
  //adds the task slected for completion to the completed tasks array before being
  //added to the 
  taskArray.push(completedTaskGoingToTasks)
  //removes the selected task from the new array before using the new array in updateDoc  
      if (index > -1) {
      completedTaskArray.splice(index, 1);
  }
    // updates the doc with the new to do list
    updateDoc(doc(db, getUserEmail(), getRef.id), {
      tasks: taskArray,
      completedTasks: completedTaskArray, 
      });

}

function deleteTasksInDatabase(id, array, index){
  //creates a reference to this doc
  const getRef = doc(db, getUserEmail(), id);
  // arrays to duplicate each task and completed tasks arrays from the dom
  let taskArray = [];
  let completedTaskArray = [];

  getIndividualProject(array).tasksArray.forEach(element =>{
    
      taskArray.push(element.tasks)
  }) 
  getIndividualProject(array).finishedTasksArray.forEach(element =>{
    
      completedTaskArray.push(element.tasks)
    
  })

  //removes the selected task from the new array before using the new array in updateDoc  
      if (index > -1) {
      completedTaskArray.splice(index, 1);
  }
    // updates the doc with the new to do list
    updateDoc(doc(db, getUserEmail(), getRef.id), {
      tasks: taskArray,
      completedTasks: completedTaskArray, 
      });
}

//deletes the document (to do list)
function deleteToDoListFromDatabase(id){
  
   deleteDoc(doc(db, getUserEmail(), id))
}

function grabFromTheDatabase(ref) {
    const collectionRef = collection(db, ref);
    //resets the projects so they will erase the previous list in the dom
    getAllProjectsArray().length = 0;
    getDocs(collectionRef)
        .then((snapshot) => {
          
          let index = 0;
          snapshot.docs.forEach((docSnapshot) => {
            // uses the add project function to add the title of each list
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
          })          
  
          createToDoListPostItNotes()
          
        })
        .catch(err => {
          console.log(err.message)
        })
  
  
  }

  export { 
    grabFromTheDatabase,
     getUserEmail,
      updateTitleInDatabase,
       editTasksInDatabase,
        updateTasksInDatabase,
         updateCompletedTasksInDatabase,
          deleteTasksInDatabase,
          deleteToDoListFromDatabase }