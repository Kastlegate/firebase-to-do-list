import { getAllProjectsArray, 
    getIndividualProject, 
    addProject, 
    addTask, 
    removeTask } from "./toDoFunctions";
import { createToDoListPostItNotes } from './toDoListDom.js';
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
    getDoc,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    docs,
    getDocs,
    collectionGroup,
    serverTimestamp,
  } from 'firebase/firestore';
  import { 
    grabFromTheDatabase, 
    getUserEmail, 
    updateTitleInDatabase, 
    getDocumentId,
    updateTasksInDatabase 
} from "./fireStoreFunctions"

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

 
// function that creates a new task and adds it when the button is pressed
function createTask(e){

    // uses the data-array-id to get the current object's taskArray;
    let array = this.getAttribute("data-create-new-task-array")
    // uses the data-task-id to get the current task inside the array
    let index = this.getAttribute("data-create-new-taskid")
    //creates a blank task that can be edited
    addTask(getIndividualProject(index), "");
    //refreshes the post it notes
    createToDoListPostItNotes()
 }

 // function for the create new project button
function createNewProjectButtonPressed(){
    addProject("", "")
    createToDoListPostItNotes()
}

// listener for the delete post it note button
function deletePostItNoteClicked(e) {
    // uses the data-task-id to get the current task inside the array
    let index = this.getAttribute("data-delete-list-id")

    // removes the task from the array 
    if (index > -1) {
        getAllProjectsArray().splice(index, 1);}
        createToDoListPostItNotes()

}

function titleTextClicked(e){

    // uses the data-array-id to get the current object's taskArray;
    let array = this.getAttribute("data-title-text-id")
    // uses the data-task-id to get the current task inside the array
    let index = this.getAttribute("data-task-text-id")

    //gets the document id assigned to this document
    let fireStoreDocumentId = this.getAttribute("data-document-id")

    //updates the textarea with the new text
    this.textContent = this.value;
    getIndividualProject(array).title = this.textContent;

    updateTitleInDatabase(fireStoreDocumentId, this.value)
    // getDocumentId(this.id)

    createToDoListPostItNotes()


}


function taskTextClicked(e){

    // uses the data-array-id to get the current object's taskArray;
    let array = this.getAttribute("data-task-text-array-id")
    // uses the data-task-id to get the current task inside the array
    let index = this.getAttribute("data-task-text-id")

    //gets the document id assigned to this document
    let fireStoreDocumentId = this.getAttribute("data-document-id-tasks")

    //updates the textarea with the new text
    this.textContent = this.value;
    getIndividualProject(array).tasksArray[index].tasks = this.textContent;
    updateTasksInDatabase(fireStoreDocumentId, array, index, this.value)
    createToDoListPostItNotes()


}

// deletes an item from the current to do list
function activeTaskInListClicked(){
    // uses the data-array-id to get the current object's taskArray;
    let array = this.getAttribute("data-array-id")
    // uses the data-task-id to get the current task inside the array
    let index = this.getAttribute("data-task-id")
    let checkMarkedTask = getIndividualProject(array).tasksArray[index];
    removeTask(getIndividualProject(array), checkMarkedTask.tasks, checkMarkedTask.priority, checkMarkedTask.dueDate);

    // removes the task from the array and populates the tasks on screen
    if (index > -1) {
        getIndividualProject(array).tasksArray.splice(index, 1);}
    createToDoListPostItNotes()
}

// reinserts an item from the finished tasks back into active tasks
function inactiveTaskInListClicked(){
    // uses the data-array-id to get the current object's finishedTaskArray;
    let array = this.getAttribute("data-finished-array-id")
    // uses the data-task-id to get the current task inside the array
    let index = this.getAttribute("data-check-marked-task-id")
    let checkMarkedTask = getIndividualProject(array).finishedTasksArray[index];

    // removes the task from the array and repopulates the tasks on screen
    if (index > -1) {
        getIndividualProject(array).finishedTasksArray.splice(index, 1);}
        addTask(getIndividualProject(array), checkMarkedTask.tasks, checkMarkedTask.priority, checkMarkedTask.dueDate);
        createToDoListPostItNotes()
}

// listener for the delete task button
function deleteTaskClicked() {
    // uses the data-array-id to get the current object's taskArray;
    let array = this.getAttribute("data-delete-Finsihed-array-id")
    // uses the data-task-id to get the current task inside the array
    let index = this.getAttribute("data-delete-task-id")

    // removes the task from the array 
    if (index > -1) {
        getIndividualProject(array).finishedTasksArray.splice(index, 1);}
        createToDoListPostItNotes()

}

export { deleteTaskClicked, inactiveTaskInListClicked, createTask, createNewProjectButtonPressed, deletePostItNoteClicked, titleTextClicked, taskTextClicked, activeTaskInListClicked }