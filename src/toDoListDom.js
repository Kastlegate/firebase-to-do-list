import { getAllProjectsArray, 
    getIndividualProject } from "./toDoFunctions";
import { deleteTaskClicked, 
    inactiveTaskInListClicked, 
    createTask, 
    createNewProjectButtonPressed, 
    deletePostItNoteClicked, 
    titleTextClicked, 
    taskTextClicked, 
    activeTaskInListClicked 
} from "./toDoListeners";


import uniqid from "uniqid";

// creates the post it notes in the dom
function createToDoListPostItNotes(){

    let array = getAllProjectsArray();
    let postItNoteContainerNumber = 1;
    let mainContent = document.getElementById("mainContent")
    let postItNoteContainerOne = document.getElementById("postItNoteContainerOne")
    let postItNoteContainerTwo = document.getElementById("postItNoteContainerTwo")
    // these containers each house a column of to do lists that will sit beside each other
    postItNoteContainerOne.textContent = "";
    postItNoteContainerTwo.textContent = "";
    // index adds a value for each post it note to be passed to listeners
    let index = 0;

    //for each loop to go through each to do list element in the array and add it to the dom
    array.forEach(element => {
        //creation of a post it note div
        let postItNote = document.createElement("div");
                postItNote.classList.add("postItNotes")
                //trash can to delete the To Do List
        
        //track the element id for the 
        let documentIdForTasks = element.id;


        // div that will be used to resize the container and textarea 
        let titleAreaContainer = document.createElement("div")
            titleAreaContainer.classList.add("titleAreaContainer")
        postItNote.appendChild(titleAreaContainer)
        // a div that resizes the textAreaContainer
        let titleAreaResizer = document.createElement("div")
            titleAreaResizer.classList.add("textAreaResizer")
            titleAreaResizer.textContent = element.title;
            titleAreaContainer.appendChild(titleAreaResizer)
        // the editable text area
        let titleTextArea = document.createElement("textArea");
            titleTextArea.dataset.documentId = element.id;
            titleTextArea.classList.add("taskTextArea");
            titleTextArea.setAttribute("value", element.title)
            titleTextArea.setAttribute("rows", "1")
            titleTextArea.setAttribute("placeholder", "New List")
            titleTextArea.dataset.titleTextId = index;
            titleTextArea.textContent = element.title;
            titleTextArea.addEventListener("change", titleTextClicked)
            titleAreaContainer.appendChild(titleTextArea);
        
        // container to house the add and delte buttons
        let addAndDeleteContainer = document.createElement("div");
        addAndDeleteContainer.classList.add("addAndDeleteContainer")
        postItNote.appendChild(addAndDeleteContainer)



        // creates the new task button
        let createNewTask = document.createElement("div");
            createNewTask.id = "createNewTask";
            // createNewTask.dataset.createNewTaskArray = array.indexOf(element);
            createNewTask.dataset.createNewTaskid = index;
            createNewTask.textContent = "+"
            createNewTask.classList.add("cursor");
            createNewTask.addEventListener("click", createTask)
            addAndDeleteContainer.appendChild(createNewTask);

        //creates a delete button to remove a task permanently
        let deletePostItNoteContainer = document.createElement("div")
            deletePostItNoteContainer.classList.add("deleteTask", "cursor", "shrinkDeleteButton")
        let deletePostItNote = document.createElement("div")
            deletePostItNote.className = "fas fa-trash-alt";
            deletePostItNote.dataset.documentIdDeletePostItNote = documentIdForTasks;
            deletePostItNote.dataset.deleteListId = index;
            deletePostItNote.dataset.deleteFinsihedArrayId = index;
            deletePostItNote.addEventListener("click", deletePostItNoteClicked)
            deletePostItNoteContainer.appendChild(deletePostItNote)
            addAndDeleteContainer.appendChild(deletePostItNoteContainer);   

        //if statement to assign notes to alternating columns
        if(postItNoteContainerNumber === 1){
            postItNoteContainerOne.appendChild(postItNote);
            postItNoteContainerNumber = 2;
        }
        else if(postItNoteContainerNumber === 2){
            postItNoteContainerTwo.appendChild(postItNote);
            postItNoteContainerNumber = 1;
        }
        
        
        //creates a list in the post it note populated with the current active tasks
        element.tasksArray.forEach(element => {

            //creating a div to hold each active task on each loop
            let task = document.createElement("div")
                task.classList.add("task")           
                

            //creates an un-checkmarked box
            let notCheckedMarkedBox = document.createElement("div");        
                notCheckedMarkedBox.className = "far fa-square";
                notCheckedMarkedBox.classList.add("cursor")
                notCheckedMarkedBox.addEventListener("click", activeTaskInListClicked)
                notCheckedMarkedBox.dataset.taskId = getIndividualProject(index).tasksArray.indexOf(element);
                notCheckedMarkedBox.dataset.arrayId = index;
                notCheckedMarkedBox.dataset.documentIdTasks = documentIdForTasks;
                task.appendChild(notCheckedMarkedBox);
                // console.log(getIndividualProject(index).tasksArray)
            // creates a div to hold the taskTextArea div and and another
            // div that will be used to resize the container and textarea 
            let textAreaContainer = document.createElement("div")
                textAreaContainer.classList.add("textAreaContainer")
                task.appendChild(textAreaContainer)
            // a div that resizes the textAreaContainer
            let textAreaResizer = document.createElement("div")
                textAreaResizer.classList.add("textAreaResizer")
                textAreaResizer.textContent = element.tasks;
                textAreaContainer.appendChild(textAreaResizer)
            // the editable text area
            let taskTextArea = document.createElement("textArea");
                taskTextArea.classList.add("taskTextArea");
                taskTextArea.setAttribute("value", element.tasks)
                taskTextArea.setAttribute("rows", "1")
                taskTextArea.setAttribute("placeholder", "New Task")
                taskTextArea.dataset.taskTextId = getIndividualProject(index).tasksArray.indexOf(element);
                taskTextArea.dataset.taskTextArrayId = index;
                taskTextArea.dataset.documentIdTasks = documentIdForTasks;
                taskTextArea.textContent = element.tasks;
                taskTextArea.addEventListener("change", taskTextClicked)
                textAreaContainer.appendChild(taskTextArea);
            
            postItNote.appendChild(task)



        });
        
        //creates a divider between the tasks that are finished and unfinished if there are finished tasks in the to do list
        let divider = document.createElement("div");
            divider.classList.add("divider")

        if (element.finishedTasksArray.length > 0 && element.tasksArray.length > 0){
            postItNote.appendChild(divider)
        }
    
        
        //creates a list in the post it note populated with the finished tasks
        element.finishedTasksArray.forEach(element => {

            //creating a div to hold each active task on each loop
            let finishedTask = document.createElement("div")
            finishedTask.classList.add("finishedTask")

            //creates an un-checkmarked box
            let checkedMarkedBox = document.createElement("div");
                checkedMarkedBox.className = "far fa-check-square";
                checkedMarkedBox.classList.add("cursor")
                checkedMarkedBox.dataset.checkMarkedTaskId = getIndividualProject(index).finishedTasksArray.indexOf(element);
                checkedMarkedBox.dataset.finishedArrayId = index;
                checkedMarkedBox.dataset.documentIdTasks = documentIdForTasks;
                checkedMarkedBox.addEventListener("click", inactiveTaskInListClicked)
                finishedTask.appendChild(checkedMarkedBox);

            // creates a div and adds the text for the current task
            let finishedTaskText = document.createElement("div");
                finishedTaskText.classList.add("finishedTaskText")
                finishedTaskText.textContent = element.tasks;
                finishedTask.appendChild(finishedTaskText);

            //creates a delete button to remove a task permanently
            let deleteTaskContainer = document.createElement("div")
                deleteTaskContainer.classList.add("deleteTask")
            let deleteTask = document.createElement("div")
                deleteTask.className = "fas fa-trash-alt";
                deleteTask.classList.add("cursor");
                deleteTask.dataset.documentIdDeleteTask = documentIdForTasks;
                deleteTask.dataset.deleteTaskId = getIndividualProject(index).finishedTasksArray.indexOf(element);
                deleteTask.dataset.deleteFinsihedArrayId = index;
                deleteTask.addEventListener("click", deleteTaskClicked)
                deleteTaskContainer.appendChild(deleteTask)
                finishedTask.appendChild(deleteTaskContainer);    


        postItNote.appendChild(finishedTask)    
        });
        // increases the index for the listeners to know which array is needed
        ++index

    });


}


export { createToDoListPostItNotes, createNewProjectButtonPressed }