let input_task = document.getElementsByName("input-task")[0]
let input_priority = document.getElementById("priority")
let add_btn = document.getElementById("add-task-btn");
let tasks_list = document.getElementsByClassName('tasks-list')[0]


add_btn.addEventListener('click', add_task_fct);
let counter_nb_of_tasks= 0

let tasks_list_leng= document.getElementsByClassName('tasks-list').length

console.log("test list lenght")
console.log( tasks_list_leng)
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
                    <button type="button" class="status-button">Ongoing</button>
                    <span class="task-title"> ${input_task.value}</span>
                    <span class="due-date">10-11-23</span>
                    <button type="button" class="priority-btn high-priority" >${input_priority.value}</button>
                    <i class="edit-btn fas fa-edit fa-xl"></i>
                    <i class="delete-btn  fas fa-trash-alt fa-xl" label="delete"></i> `

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
                    <button type="button" class="status-button">Ongoing</button>
                    <span class="task-title"> ${input_task.value}</span>
                    <span class="due-date">10-11-23</span>
                    <button type="button" class="priority-btn">${input_priority.value}</button>
                    <i class="edit-btn fas fa-edit fa-xl"></i>
                    <i class="delete-btn fas fa-trash-alt fa-xl" label="delete"></i> `

        console.log(tasks_list)
        tasks_list.appendChild(new_task_added)
    }

    //clear input field
    input_task.value = ""



    //function to remove task
    // let delete_btn = document.getElementById(`delete-btn-${counter_nb_of_tasks}`)
    let task_index= counter_nb_of_tasks-1
    console.log("index",task_index)
    let delete_btn = document.getElementsByClassName('delete-btn')[task_index]
    console.log("test",delete_btn)
    console.log("test id",document.getElementById(`delete-btn-${counter_nb_of_tasks}`))


    delete_btn.addEventListener('click', function (e) {
        console.log("trying to delete")
        e.target.closest('li').remove();
    })


    // function to edit task title
    // let edit_btn = document.getElementById(`edit-btn-${counter_nb_of_tasks}`)
    let edit_btn = document.getElementsByClassName('edit-btn')[task_index]
    let current_priority = edit_btn.previousElementSibling;
    let current_due_date = current_priority.previousElementSibling;
    let current_task_tile = current_due_date.previousElementSibling;
    console.log(current_task_tile)

    edit_btn.addEventListener('click', function (e) {
        console.log("trying to edit")
        let new_task_title = prompt("Please enter the new task name :")
        current_task_tile.innerHTML=new_task_title

    })


    // function to change task status
    // let status_btn=document.getElementById(`status-button-${counter_nb_of_tasks}`)
    let status_btn=document.getElementsByClassName('status-button')[task_index]
    console.log(status_btn)
    status_btn.addEventListener('click', function (e) {
        console.log("trying to change status")
        status_btn.classList.toggle("finished-status")
        if(status_btn.innerHTML=="Ongoing"){
            status_btn.innerHTML="Finished"

        }
        else{
            status_btn.innerHTML="Ongoing"

        }

    })
}





