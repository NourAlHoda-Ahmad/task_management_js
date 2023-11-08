let input_task = document.getElementsByName("input-task")[0]
let input_priority = document.getElementById("priority")
let add_btn = document.getElementById("add-task-btn");

let tasks_list = document.getElementsByClassName('tasks-list')[0]


add_btn.addEventListener('click', add_task_fct);


let counter_nb_of_tasks_nb_of_tasks = 0

// function to add task
function add_task_fct() {

    console.log(input_task.value)
    console.log(input_priority.value)
    console.log(input_task.value.length)

    // no input entered
    if (!input_task.value.length) {
        console.log("no input value")
        alert("Enter A task ...")
        return false
    }

    // high priority
    if (input_priority.value == "high") {
        counter_nb_of_tasks += 1

        console.log("high test")
        console.log(input_task.value)

        let new_task_added = document.createElement('li')
        new_task_added.innerHTML = `
                    <button type="button" class="status-button"></button>
                    <button type="button" class="priority-btn high-priority" >${input_priority.value}</button>
                    <span class="task-title"> ${input_task.value}</span>
                    <span class="due-date">10-11-23</span>
                    <button class="edit-btn" id="edit-btn-${counter_nb_of_tasks}">edit</button>
                    <button class="delete-btn" id="delete-btn-${counter_nb_of_tasks}">delete</button> `

        console.log(tasks_list)
        tasks_list.appendChild(new_task_added)
    }

    // low priority
    else {

        counter_nb_of_tasks += 1

        console.log("low test")
        console.log(input_task.value)

        let new_task_added = document.createElement('li')
        new_task_added.innerHTML = `
                    <button type="button" class="status-button">ongoing</button>
                    <button type="button" class="priority-btn">${input_priority.value}</button>
                    <span class="task-title"> ${input_task.value}</span>
                    <span class="due-date">10-11-23</span>
                    <button class="edit-btn" id="edit-btn-${counter_nb_of_tasks}">edit</button>
                    <button class="delete-btn" id="delete-btn-${counter_nb_of_tasks}">delete</button> `

        console.log(tasks_list)
        tasks_list.appendChild(new_task_added)
    }

    //clear input field
    input_task.value = ""


    
    //function to remove task
    let delete_btn = document.getElementById(`delete-btn-${counter_nb_of_tasks}`)
    console.log(delete_btn)

    delete_btn.addEventListener('click', function (e) {
        console.log("trying to delete")
        e.target.closest('li').remove();
    })


    //function to edit task title
    let edit_btn = document.getElementById(`edit-btn-${counter_nb_of_tasks}`)
    let current_due_date = edit_btn.previousElementSibling;
    let current_task_tile = current_due_date.previousElementSibling;
    console.log(current_task_tile)

    edit_btn.addEventListener('click', function (e) {
        console.log("trying to edit")
        let new_task_title = prompt("Please enter the new task name :")
        current_task_tile.innerHTML=new_task_title
    })
}





