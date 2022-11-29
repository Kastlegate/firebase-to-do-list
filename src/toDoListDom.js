import { getAllProjectsArray, getIndividualProject, addProject, addTask, removeTask } from "./toDoFunctions";

// saves the current to do lists
function saveLists(){
    localStorage.setItem('projects', JSON.stringify(getAllProjectsArray()))
}

// unhides the New Project form
function newProjectFormActivate(){
    let form = document.getElementById("newProjectForm");
    form.className = "";    
    newProjectForm.classList.add("newForm")
}

// hides the New Project form 
function newProjectFormDeactivate(){
    let form = document.getElementById("newProjectForm");
    form.className = "";    
    newProjectForm.classList.add("hideForm")
    document.getElementById("title").value = "";
    document.getElementById("firstTask").value = "";
}

// unhides the New Task project form
function newTaskFormActivate(){
    let form = document.getElementById("newTaskForm");
    form.className = "";    
    newTaskForm.classList.add("newTaskForm")
}

// hides the New Task form 
function newTaskFormDeactivate(){
    let form = document.getElementById("newTaskForm");
    form.className = "";    
    form.classList.add("hideForm"); 
    document.getElementById("newTask").value = ""; 
}

// //function to be called when a project from the list in the sidebar is clicked
// function sideBarProjectClicked(){
//     let titleArray = getAllProjectsArray();    
//     let projectContent = document.getElementById("projectContent");
//     let currentProjectTitle = document.getElementById("currentProjectTitle");
//     let index = this.getAttribute("data-sideBarid");
//     currentProjectTitle.textContent = getIndividualProject(index).title;
//     addTasksToCurrentProject(index);
// }

//adds each Project title to the sidebar
// function addProjectsToSideBar(thisArray){
//     let projectsList = document.getElementById("projectListContainer");
//     let array = thisArray;
//     projectsList.textContent = "";
//     array.forEach(element => {
//         //current total of active tasks in a project
//         let amountOfTasksInProject = element.tasksArray.length;
        
//         let projectToBeAddedToList = document.createElement("div");
//         projectToBeAddedToList.id = "project: " + array.indexOf(element);
//         projectToBeAddedToList.dataset.sidebarid = array.indexOf(element);
//         projectToBeAddedToList.classList.add("sideBarProjectList")
//         projectToBeAddedToList.textContent = element.title + ": (" + amountOfTasksInProject + ")";
//         let taskTotal = document.createElement("div")
//         taskTotal.textContent = 
//         projectToBeAddedToList.addEventListener("click", sideBarProjectClicked)
//         projectsList.appendChild(projectToBeAddedToList);        
//     });
    
// }

// funtion to add the current form as a new To Do List project
function addProjectButtonClicked(){

    // adds the project
    currentProjectTitle.textContent = document.getElementById("title").value;
    addProject();
    addProjectsToSideBar(getAllProjectsArray());
    //deactivates the project form, hiding it again
    newProjectFormDeactivate();
    // Displays the newly created project's initial task
    let index = getAllProjectsArray().length - 1;
    addTasksToCurrentProject(index);
    saveLists();

}

// cancels the new project form
function addnewProjectCancelClicked(){
    newProjectFormDeactivate();
}

// listener that adds a new task to the list if the add new task button is clicked
function addNewTaskButtonClicked(){
    let index = this.getAttribute("data-add-task-id");
    let newTask = document.getElementById("newTask").value;
    addTask(getIndividualProject(index), newTask);
    newTaskFormDeactivate();
    addTasksToCurrentProject(index);
    document.getElementById("newTask").value = "";
    addProjectsToSideBar(getAllProjectsArray());
}

// listener for bringing up the Add new task form
function createNewTaskClicked(){
    
    let index = this.getAttribute("data-create-new-taskid");
    newTaskFormActivate()
    // creates a button to add the project
    let addnewTaskButton = document.getElementById("addnewTaskButton")
    addnewTaskButton.dataset.addTaskId = index; 
    saveLists();

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

        addTasksToCurrentProject(array);

}
//function that sets the task's priority
function menuSelection(){
    let index = this.getAttribute("data-select-priority-id");
    let array =  this.getAttribute("data-select-priority-array-id");
    let select = this.getAttribute("id");

    switch (select) {
        case "priority-Low":
            getIndividualProject(array).tasksArray[index].priority = 1;
            break;

        case "priority-Medium":
            getIndividualProject(array).tasksArray[index].priority = 2;
            break;

        case "priority-High":
            getIndividualProject(array).tasksArray[index].priority = 3;
            break;
    }
    addTasksToCurrentProject(array);
}

function dateSelected(){
    let index = this.getAttribute("data-due-date-id");
    let array =  this.getAttribute("data-due-date-array");
    let date = document.getElementById("Task " + index + ": DueDate")
    getIndividualProject(array).tasksArray[index].dueDate = date.value;
    saveLists();
}



//adds each task to the projectContent depending on which To Do is inserted as an argument
function addTasksToCurrentProject(i){
    
    let array = getIndividualProject(i)
    let index = i;
    let projectContent = document.getElementById("projectContent");
    //erases tasks that are displayed in the project content
    projectContent.textContent = "";
    
    // creates the new task button
    let createNewTask = document.createElement("div");
    createNewTask.id = "createNewTask";
    createNewTask.dataset.createNewTaskid = index;
    createNewTask.textContent = "+ Create new task"
    createNewTask.classList.add("taskContainer");
    createNewTask.addEventListener("click", createNewTaskClicked)
    projectContent.appendChild(createNewTask);

    //divider between unfinished and finished tasks
    let dividerContainer = document.createElement("div");
    dividerContainer.id = "dividerContainer"
    let dividerLeft = document.createElement("hr");
    dividerLeft.id = "dividerLeft";
    dividerLeft.classList.add("dividers")
    let finishedTaskCount = document.createElement("div");
    finishedTaskCount.textContent = "Finished Tasks: (" + array.finishedTasksArray.length + ")";
    finishedTaskCount.id = "finishedTaskCount";
    let dividerRight = document.createElement("hr");
    dividerRight.id = "dividerRight";
    dividerRight.classList.add("dividers")
    dividerContainer.appendChild(dividerLeft);
    dividerContainer.appendChild(finishedTaskCount);
    dividerContainer.appendChild(dividerRight);
    projectContent.appendChild(dividerContainer);

    // for each that runs through the object's taskArray and adding each item to the projectContent's
    // active tasks    
    array.tasksArray.forEach(element => {
        //container for priority, task, and due date
        let activeContainer = document.createElement("div");
        activeContainer.id = element.tasks + "-activeContainer"
        activeContainer.classList.add("taskContainer")
        projectContent.insertBefore(activeContainer, createNewTask);

        //creates an un-checkmarked box
        let notCheckedMarkedBox = document.createElement("div");
        
        notCheckedMarkedBox.className = "far fa-square";
        notCheckedMarkedBox.classList.add("cursor")
        notCheckedMarkedBox.addEventListener("click", activeTaskInListClicked)
        notCheckedMarkedBox.dataset.taskId = array.tasksArray.indexOf(element);
        notCheckedMarkedBox.dataset.arrayId = index;
        activeContainer.appendChild(notCheckedMarkedBox);

        //creates a div which holds the task that is added
        let taskToAdd = document.createElement("div");
        taskToAdd.id = element.tasks;
        taskToAdd.classList.add("taskTextContainer")
        taskToAdd.textContent = element.tasks;      
        activeContainer.appendChild(taskToAdd);

        //sets the priority of the task
        let priorityText = document.createElement("div");
        priorityText.id = "priorityText"
        priorityText.textContent = "Priority: ";
        activeContainer.appendChild(priorityText);
        let taskPriority = document.createElement("select")
        let priorityLow = document.createElement("option");
            priorityLow.textContent = "Low";
            priorityLow.id = "priority-Low"
            priorityLow.dataset.selectPriorityId = array.tasksArray.indexOf(element);
            priorityLow.dataset.selectPriorityArrayId = index;
            priorityLow.addEventListener("click", menuSelection)
            taskPriority.appendChild(priorityLow);
        let priorityMedium = document.createElement("option");
            priorityMedium.textContent = "Medium";
            priorityMedium.id = "priority-Medium";
            priorityMedium.dataset.selectPriorityId = array.tasksArray.indexOf(element);
            priorityMedium.dataset.selectPriorityArrayId = index;
            priorityMedium.addEventListener("click", menuSelection)
            taskPriority.appendChild(priorityMedium)
        let priorityHigh = document.createElement("option");
            priorityHigh.textContent = "High";
            priorityHigh.id = "priority-High";
            priorityHigh.dataset.selectPriorityId = array.tasksArray.indexOf(element);
            priorityHigh.dataset.selectPriorityArrayId = index;
            priorityHigh.addEventListener("click", menuSelection)
            taskPriority.appendChild(priorityHigh)
            activeContainer.appendChild(taskPriority);

        if (element.priority == 1){
            priorityLow.selected = true;
        }

        else if (element.priority == 2){
            priorityMedium.selected = true;
        }

        else if (element.priority == 3){
            priorityHigh.selected = true;
        }

        
        // creating Due Dates
        let date = document.createElement("input");
        date.id = "Task " + array.tasksArray.indexOf(element) + ": DueDate";
        date.classList.add("date");
        date.type = "date";
        date.dataset.dueDateId = array.tasksArray.indexOf(element);
        date.dataset.dueDateArray = index;
        date.addEventListener("change", dateSelected)
        date.value = element.dueDate;
        activeContainer.appendChild(date);

        // element.dueDate = date.value;

        // let dueDate = new Date()


    });

    // similar for each that runs through the finishedTasks array and creating an object for each task
    // and adding it to the projectContent    
    array.finishedTasksArray.forEach(element => {

        // container for each completed and check marked task
        let inactiveContainer = document.createElement("div");
            inactiveContainer.id = element + "-inactiveContainer"
            inactiveContainer.classList.add("taskContainer")
            projectContent.appendChild(inactiveContainer);

        //creates a checkmarked box
        let checkedMarkedBox = document.createElement("div");
            checkedMarkedBox.className = "far fa-check-square";
            checkedMarkedBox.classList.add("cursor")
            checkedMarkedBox.dataset.checkmarkedTaskId = array.finishedTasksArray.indexOf(element);
            checkedMarkedBox.dataset.finsihedArrayId = index;
            checkedMarkedBox.addEventListener("click", inactiveTaskInListClicked)
            inactiveContainer.appendChild(checkedMarkedBox);
        
        //creates a div which holds the task that is added
        let checkMarkedtaskToAdd = document.createElement("div");
            checkMarkedtaskToAdd.id = element.tasks;
            checkMarkedtaskToAdd.classList.add("taskChecked")
            checkMarkedtaskToAdd.classList.add("taskTextContainer")
            checkMarkedtaskToAdd.textContent = element.tasks;
            // checkMarkedtaskToAdd.addEventListener("click", inactiveTaskInListClicked)
            inactiveContainer.appendChild(checkMarkedtaskToAdd);

        //creates a delete button to remove a task permanently
        let deleteTask = document.createElement("div")
            deleteTask.className = "fas fa-trash-alt";
            deleteTask.classList.add("cursor");
            deleteTask.classList.add("deleteTask");
            deleteTask.dataset.deleteTaskId = array.finishedTasksArray.indexOf(element);
            deleteTask.dataset.deleteFinsihedArrayId = index;
            deleteTask.addEventListener("click", deleteTaskClicked)
            inactiveContainer.appendChild(deleteTask);    
    });
    saveLists();

}

function taskTextClicked(e){

    // uses the data-array-id to get the current object's taskArray;
    let array = this.getAttribute("data-task-text-array-id")
    // uses the data-task-id to get the current task inside the array
    let index = this.getAttribute("data-task-text-id")
    // console.log(getAllProjectsArray(array).tasksArray[index])
    // e.value = e.value;
    this.textContent = this.value;
    console.log(this.textContent)
    getIndividualProject(array).tasksArray[index].tasks = this.textContent;
    createToDoListPostItNotes()


}





function createToDoListPostItNotes(){

    let array = getAllProjectsArray();
    let mainContent = document.getElementById("mainContent")
    mainContent.textContent = "";
    let index = 0;

    const growers = document.querySelectorAll(".grow-wrap");



    // let currentProject = getIndividualProject(index);

    //for each loop to go through each to lod list element in the array and add it to the dom
    array.forEach(element => {
        //creation of a post it note div
        let postItNote = document.createElement("div");
            postItNote.classList.add("postItNotes")
            
        //Gets the name of the current to do list and creates a div for it and adds it to the post it note
        let nameOfToDoList = document.createElement("div");
            nameOfToDoList.classList.add("nameOfToDoList")
            nameOfToDoList.textContent = element.title;
            postItNote.appendChild(nameOfToDoList)

        // creates the new task button
        let createNewTask = document.createElement("div");
        createNewTask.id = "createNewTask";
        createNewTask.dataset.createNewTaskid = index;
        createNewTask.textContent = "+"
        createNewTask.classList.add("cursor");
        createNewTask.addEventListener("click", createNewTaskClicked)
        postItNote.appendChild(createNewTask);

        //adds the new post it note to the main content of the page
        mainContent.appendChild(postItNote);
        
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
                task.appendChild(notCheckedMarkedBox);

            // creates a div and adds the text for the current task
            let textAreaContainer = document.createElement("div")
                textAreaContainer.classList.add("textAreaContainer")
                task.appendChild(textAreaContainer)

            let textAreaTwin = document.createElement("div")
                textAreaTwin.classList.add("textAreaTwin")
                textAreaTwin.textContent = element.tasks;
                textAreaContainer.appendChild(textAreaTwin)

            let taskTextArea = document.createElement("textArea");
                // taskText.setAttribute("type", "text");
                taskTextArea.classList.add("taskTextArea");
                taskTextArea.setAttribute("value", element.tasks)
                taskTextArea.dataset.taskTextId = getIndividualProject(index).tasksArray.indexOf(element);
                taskTextArea.dataset.taskTextArrayId = index;
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
            checkedMarkedBox.addEventListener("click", inactiveTaskInListClicked)
            finishedTask.appendChild(checkedMarkedBox);

        // creates a div and adds the text for the current task
        let finishedTaskText = document.createElement("div");
            finishedTaskText.classList.add("finishedTaskText")
            finishedTaskText.textContent = element.tasks;
            finishedTask.appendChild(finishedTaskText);
        postItNote.appendChild(finishedTask)    
        });
        // increases the index for the listeners to know which array is needed
        ++index

        //
        growers.forEach((grower) => {
            const textarea = grower.querySelector("textarea");
            textarea.addEventListener("input", () => {
              grower.dataset.replicatedValue = textarea.value;
            });
          });

    });


}


export { addTasksToCurrentProject, newProjectFormActivate, newProjectFormDeactivate, newTaskFormActivate,
    newTaskFormDeactivate, addNewTaskButtonClicked, addProjectButtonClicked, addnewProjectCancelClicked, createToDoListPostItNotes }