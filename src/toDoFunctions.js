// import {  } from "./toDoListDom";

//factory that is used to create new projects
function projectFactory (title, tasks, priority, dueDate)
{
    title = title;
    //another factory that will hold a task object, it's priority and it's due date 
    function fullTask (task){
        tasks = task;
        priority = priority;
        dueDate = dueDate;

        return{tasks, priority, dueDate}
    }
    // creates a task with the fullTask function
    let tasky = fullTask(tasks, priority, dueDate )

    //an Array that holds each To do list's tasks
    let tasksArray = new Array();
    tasksArray.push(tasky);
    // an array that holds all finsished and checked tasks
    let finishedTasksArray = new Array();

    return { title, tasksArray, finishedTasksArray, }
}

//  adds a task to the tasksArray
function addTask(array, tasks, priority, dueDate){

    function fullTask (task, priority, dueDate){
        tasks = task;
        priority = priority;
        dueDate = dueDate;

        return{tasks, priority, dueDate}
    }
    //
    let tasky = fullTask(tasks, priority, dueDate)

    array.tasksArray.push(tasky);
}

//adds a task to the completed task array
function removeTask(array, tasks, priority, dueDate){
    function fullTask (task, priority, dueDate){
        tasks = task;
        priority = priority;
        dueDate = dueDate;

        return{tasks, priority, dueDate}
    }

    let tasky = fullTask(tasks, priority, dueDate)

    array.finishedTasksArray.push(tasky);
}

let defaultProjectOne = projectFactory("Mow The Lawn", "Charge the battery", 3);
let defaultProjectTwo = projectFactory("Get stuff for Tacos", "Hamburger", 2);

let allProjects = new Array();
allProjects.push(defaultProjectOne);
allProjects.push(defaultProjectTwo);

addTask(allProjects[0], "Get mower out of storage", 2);
addTask(allProjects[1], "Shells", 2);
addTask(allProjects[1], "Shredded Mexican Cheese", 2);
removeTask(allProjects[1], "Seasoning", 1)

function getAllProjectsArray(){
    return allProjects;
}

function getIndividualProject(i){
    return allProjects[i];
}

function addProject(title, task, priority){
    let newProject = projectFactory(document.getElementById("title").value, 
    document.getElementById("firstTask").value, priority)
    allProjects.push(newProject);
}

function setallProjects(array){
    allProjects = array;
    return allProjects;
}


 export { getAllProjectsArray, getIndividualProject, addProject, setallProjects, addTask, removeTask };