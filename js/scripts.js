let input_task = document.getElementsByName("input-task")[0]
let input_priority = document.getElementById("priority")
let add_btn = document.getElementById("add-task-btn");

let tasks_list = document.getElementsByClassName('tasks-list')[0]


add_btn.addEventListener('click', add_task_fct);

let counter = 0

console.log("test")

console.log(document.getElementsByName("input-task"))

// function to add task
function add_task_fct() {

    console.log(input_task.value)
    console.log(input_priority.value)


    console.log(input_task.value.length)
    if (!input_task.value.length) {


        console.log("no input value")
        alert("Enter A task ...")
        return false
    }



    if (input_priority.value == "high") {
        counter += 1

        console.log("high test")
        console.log(input_task.value)

        let new_task_added = document.createElement('li')
        new_task_added.innerHTML = `
                    <button type="button" class="status-button"></button>
                    <button type="button" class="priority-btn high-priority" >${input_priority.value}</button>
                    <span class="task-title"> ${input_task.value}</span>
                    <span class="due-date">10-11-23</span>
                    <button class="edit-btn">edit</button>
                    <button class="delete-btn" id="delete-btn-${counter}">delete</button> `

        console.log(tasks_list)
        tasks_list.appendChild(new_task_added)
    }

    else {

        counter += 1

        console.log("low test")
        console.log(input_task.value)

        let new_task_added = document.createElement('li')
        new_task_added.innerHTML = `
                    <button type="button" class="status-button"></button>
                    <button type="button" class="priority-btn">${input_priority.value}</button>
                    <span class="task-title"> ${input_task.value}</span>
                    <span class="due-date">10-11-23</span>
                    <button class="edit-btn">edit</button>
                    <button class="delete-btn" id="delete-btn-${counter}">delete</button> `

        console.log(tasks_list)
        tasks_list.appendChild(new_task_added)
    }

    input_task.value = ""

    console.log("test")
    console.log(counter)

    //function to remove task
    let delete_btn = document.getElementById(`delete-btn-${counter}`)
    console.log(delete_btn)
    delete_btn.addEventListener('click', function (e) {
        console.log("trying to delete")
        e.target.closest('li').remove();
    })
}





