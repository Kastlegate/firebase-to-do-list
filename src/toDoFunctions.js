

//factory that is used to create new projects
function projectFactory (title, tasks, id)
{
    title = title;

    // id pulled from firestore
    // id = id;

    //another factory that will hold a task object, it's priority and it's due date 
    function fullTask (task){
        tasks = task;

        return{tasks}
    }
    // creates a task with the fullTask function
    let newTask = fullTask(tasks)

    //an Array that holds each To do list's tasks
    let tasksArray = new Array();
    // an array that holds all finsished and checked tasks
    let finishedTasksArray = new Array();

    return { title, id, tasksArray, finishedTasksArray, }
}

//  adds a task to the tasksArray
function addTask(array, tasks){

    function fullTask (task){
        tasks = task;

        return{tasks}
    }
    //
    let newTask = fullTask(tasks)

    array.tasksArray.push(newTask);
}

//adds a task to the completed task array
function removeTask(array, tasks){
    function fullTask (task){
        tasks = task;

        return{tasks}
    }

    let newTask = fullTask(tasks)

    array.finishedTasksArray.push(newTask);
}

// let defaultProjectOne = projectFactory("", "", 3);
// let defaultProjectTwo = projectFactory("Get stuff for Tacos", "Hamburger", 2);

let allProjects = new Array();


function getAllProjectsArray(){
    // console.log(allProjects)
    return allProjects;
}

function getIndividualProject(i){
    return allProjects[i];
}

function addProject(title, task, id){

    let newProject = projectFactory(title, task, id);
    allProjects.push(newProject);
}

function setallProjects(array){
    allProjects = array;
    return allProjects;
}


 export { getAllProjectsArray, getIndividualProject, addProject, setallProjects, addTask, removeTask };