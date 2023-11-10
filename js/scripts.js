let input_task = document.getElementsByName("input-task")[0]
let input_priority = document.getElementById("priority")
let add_btn = document.getElementById("add-task-btn")
let tasks_list = document.getElementsByClassName('tasks-list')[0]
let tasks_list_finished = document.getElementsByClassName('tasks-list')[1]
let tasks_list_ongoing = document.getElementsByClassName('tasks-list')[2]
let alert_message = document.getElementsByClassName('alert-message')[0]


let all_tasks = [];
let finished_tasks = [];
let ongoing_tasks = [];

let counter_nb_of_tasks = 0
let index_task = 0



add_btn.addEventListener('click', task_management_fct);
// function all task managment
function task_management_fct() {


    // add new task
    add_new_task(input_task, input_priority)

    //delete task
    delete_task(index_task)

    //edit task title
    let current_task_title = document.getElementsByClassName('task-title')[index_task]
    edit_task_title(index_task, current_task_title)


    //change status
    change_status(index_task, finished_tasks, ongoing_tasks,current_task_title)
}



//function to add new li
function add_new_task(input_task, input_priority) {


    // Task input field empty
    if (!input_task.value.length) {

        input_task.setAttribute("class", "input-warning")
        alert_message.style.display = "block";
        console.log(alert_message)
        return false
    }




    counter_nb_of_tasks += 1
    index_task = counter_nb_of_tasks - 1

    //Task input field not empty
    
    //remove alert message
    alert_message.style.display = "none";
    input_task.classList.remove("input-warning");
    

    // add to all tasks array & ongoing array
    all_tasks.push([input_task, input_priority])
    ongoing_tasks.push(input_task.value)


    // display
    let new_task_added = document.createElement('li')
    if (input_priority.value == 'high') {
        new_task_added.innerHTML = `
        <button type="button" class="status-button">Ongoing</button>
        <span class="task-title"> ${input_task.value}</span>
        <button type="button" class="priority-btn high-priority">${input_priority.value}</button>
        <i class="edit-btn fas fa-edit fa-xl"></i>
        <i class="delete-btn fas fa-trash-alt fa-xl" label="delete"></i> `
    }

    else {
        new_task_added.innerHTML = `
                        <button type="button" class="status-button">Ongoing</button>
                        <span class="task-title"> ${input_task.value}</span>
                        <button type="button" class="priority-btn">${input_priority.value}</button>
                        <i class="edit-btn fas fa-edit fa-xl"></i>
                        <i class="delete-btn fas fa-trash-alt fa-xl" label="delete"></i> `
    }


    //add to all tasks ul to display
    tasks_list.appendChild(new_task_added)
    

    //clear input field
    input_task.value = ""

}




//function to delete task
function delete_task(task_index) {
    let delete_btn = document.getElementsByClassName('delete-btn')[task_index]

    delete_btn.addEventListener('click', function (e) {
        let removed_task = all_tasks.splice(task_index, 1)
        console.log("deleted from all tasks", all_tasks, removed_task)

        e.target.closest('li').remove();
        counter_nb_of_tasks -= 1;
        task_index -= 1;



    })

}


//function to edit task title
function edit_task_title(task_index, current_task_title) {
    let edit_btn = document.getElementsByClassName('edit-btn')[task_index]

    edit_btn.addEventListener('click', function (e) {
        let new_task_title = prompt("Please enter the new task name :")
        current_task_title.innerHTML = new_task_title

    })

}


//function to change status
function change_status(task_index, finished_tasks, ongoing_tasks, current_task_title) {
    let status_btn = document.getElementsByClassName('status-button')[task_index]

    status_btn.addEventListener('click', function (e) {

        status_btn.classList.toggle("finished-status")
        if (status_btn.innerHTML == "Ongoing") {

            status_btn.innerHTML = "Finished"

            //add to finished task array
            let done_task = current_task_title.innerText
            finished_tasks.push(done_task)


            //remove from ongoing task array
            const index = ongoing_tasks.indexOf(done_task);
            ongoing_tasks.splice(index, 1)


        }
        else {

            //remove from finished task array
            let re_do_task = current_task_title.innerText
            const index_redo = finished_tasks.indexOf(re_do_task);
            finished_tasks.splice(index_redo, 1)

            //add to ongoing task array
            ongoing_tasks.push(re_do_task)
            status_btn.innerHTML = "Ongoing"

        }

    })

  

}




// onclick show all tasks
let sort_all_btn = document.getElementById("sort-all")
sort_all_btn.addEventListener('click', function () {

    sort_finished_btn.style.backgroundColor = "";
    sort_ongoing_btn.style.backgroundColor = "";
    sort_all_btn.style.backgroundColor = 'grey';

    tasks_list.removeAttribute('class', 'hide-ul')
    tasks_list_ongoing.setAttribute('class', 'hide-ul')
    tasks_list_finished.setAttribute('class', 'hide-ul')

})





// Event to display finished tasks


let sort_finished_btn = document.getElementById("sort-finished")
sort_finished_btn.addEventListener('click', function () {

    sort_all_btn.style.backgroundColor = "";
    sort_ongoing_btn.style.backgroundColor = "";
    sort_finished_btn.style.backgroundColor = 'grey';

    tasks_list.setAttribute('class', 'hide-ul')
    tasks_list_ongoing.setAttribute('class', 'hide-ul')
    tasks_list_finished.removeAttribute('class', 'hide-ul')

    tasks_list_finished.innerHTML = "";
    display_tasks(finished_tasks, tasks_list_finished, 'Finished')




})


// Event to display ongoing tasks

let sort_ongoing_btn = document.getElementById("sort-ongoing")
sort_ongoing_btn.addEventListener('click', function () {

    sort_finished_btn.style.backgroundColor = "";
    sort_all_btn.style.backgroundColor = "";
    sort_ongoing_btn.style.backgroundColor = 'grey';

    tasks_list.setAttribute('class', 'hide-ul')
    tasks_list_finished.setAttribute('class', 'hide-ul')
    tasks_list_ongoing.removeAttribute('class', 'hide-ul')


    tasks_list_ongoing.innerHTML = "";
    display_tasks(ongoing_tasks, tasks_list_ongoing, 'Ongoing')

})



//For Finished and Ongoing Tasks display
//function to display ul
function display_tasks(array_tasks, ul_task_list, status) {

    //  display
    for (let i = 0; i < array_tasks.length; i++) {
        let new_task_added = document.createElement('li')
        if (status == "Finished") {
            new_task_added.innerHTML = `
                            <button type="button" class="status-button finished-status ">Finished</button>
                            <span class="task-title"> ${array_tasks[i]}</span>
                            `
        }

        else {
            new_task_added.innerHTML = `
            <button type="button" class="status-button">Ongoing</button>
            <span class="task-title"> ${array_tasks[i]}</span>
             `
        }

        //add to all tasks ul to display
        ul_task_list.appendChild(new_task_added)
        console.log("ul ", ul_task_list)
        console.log('all tasks', array_tasks)
  
    }

}


