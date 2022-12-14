import { getAllProjectsArray, getIndividualProject, addProject, addTask, removeTask } from "./toDoFunctions";
import { createToDoListPostItNotes } from './toDoListDom.js';

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
    
    console.log("projects length " + getAllProjectsArray.length)
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

    //updates the textarea with the new text
    this.textContent = this.value;
    getIndividualProject(array).title = this.textContent;
    createToDoListPostItNotes()


}


function taskTextClicked(e){

    // uses the data-array-id to get the current object's taskArray;
    let array = this.getAttribute("data-task-text-array-id")
    // uses the data-task-id to get the current task inside the array
    let index = this.getAttribute("data-task-text-id")

    //updates the textarea with the new text
    this.textContent = this.value;
    getIndividualProject(array).tasksArray[index].tasks = this.textContent;
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