let input_task = document.getElementsByName("input-task")[0]
let input_priority = document.getElementById("priority")
let add_btn = document.getElementById("add-task-btn")
let tasks_list = document.getElementsByClassName('tasks-list')[0]
let tasks_list_finished = document.getElementsByClassName('tasks-list')[1]
let tasks_list_ongoing = document.getElementsByClassName('tasks-list')[2]
let alert_message = document.getElementsByClassName('alert-message')[0]

console.log(alert_message)
// let all_tasks=[];
let all_tasks = [];
let finished_tasks = [];
let ongoing_tasks = [];

let counter_nb_of_tasks = 0
let index_task = 0



add_btn.addEventListener('click', task_management_fct);
// function to add task
function task_management_fct() {

    console.log(input_task.value)
    console.log(input_priority.value)
    console.log(input_task.value.length)

    // add new task
    add_new_task(input_task, input_priority)
    // display_tasks(all_tasks, tasks_list)

    //delete task
    delete_task(index_task)

    //edit task title
    let current_task_tile = document.getElementsByClassName('task-title')[index_task]
    edit_task_title(index_task, current_task_tile)


    //change status
    change_status(index_task, finished_tasks, ongoing_tasks, all_tasks, current_task_tile)
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
    console.log(alert_message)

    // add to all tasks array & ongoing array
    all_tasks.push([input_task, input_priority])
    ongoing_tasks.push(input_task.value)


    // display
    let new_task_added = document.createElement('li')
    if (input_priority.value == 'high') {
        new_task_added.innerHTML = `
        <button type="button" class="status-button">Ongoing</button>
        <span class="task-title"> ${input_task.value}</span>
        <span class="due-date">10-11-23</span>
        <button type="button" class="priority-btn high-priority">${input_priority.value}</button>
        <i class="edit-btn fas fa-edit fa-xl"></i>
        <i class="delete-btn fas fa-trash-alt fa-xl" label="delete"></i> `
    }

    else {
        new_task_added.innerHTML = `
                        <button type="button" class="status-button">Ongoing</button>
                        <span class="task-title"> ${input_task.value}</span>
                        <span class="due-date">10-11-23</span>
                        <button type="button" class="priority-btn">${input_priority.value}</button>
                        <i class="edit-btn fas fa-edit fa-xl"></i>
                        <i class="delete-btn fas fa-trash-alt fa-xl" label="delete"></i> `
    }


    //add to all tasks ul to display
    tasks_list.appendChild(new_task_added)
    console.log("ul ", tasks_list)
    console.log('all tasks', all_tasks)
    // console.log('all tasks', all_tasks[0][0].value)

}




//function to delete task
function delete_task(task_index) {
    let delete_btn = document.getElementsByClassName('delete-btn')[task_index]
    console.log("test", delete_btn)

    delete_btn.addEventListener('click', function (e) {
        let removed_task = all_tasks.splice(task_index, 1)
        console.log("deleted from all tasks", all_tasks, removed_task[0])

        console.log("trying to delete")
        e.target.closest('li').remove();
        counter_nb_of_tasks -= 1;
        task_index -= 1;



    })

}


//function to edit task title
function edit_task_title(task_index, current_task_tile) {
    let edit_btn = document.getElementsByClassName('edit-btn')[task_index]
    console.log(current_task_tile)

    edit_btn.addEventListener('click', function (e) {
        console.log("trying to edit")
        let new_task_title = prompt("Please enter the new task name :")
        current_task_tile.innerHTML = new_task_title

    })

}


//function to change status
function change_status(task_index, finished_tasks, ongoing_tasks, all_tasks, current_task_tile) {
    let status_btn = document.getElementsByClassName('status-button')[task_index]
    console.log(status_btn)

    status_btn.addEventListener('click', function (e) {
        console.log("trying to change status")

        status_btn.classList.toggle("finished-status")
        if (status_btn.innerHTML == "Ongoing") {

            console.log("currrent index:", task_index)
            status_btn.innerHTML = "Finished"

            //add to finished task array
            let done_task = current_task_tile.innerText
            // let done_task = all_tasks[task_index]
            finished_tasks.push(done_task)
            console.log("added to finished", finished_tasks, done_task[0].value)


            //remove from ongoing task array
            const index = ongoing_tasks.indexOf(done_task);
            ongoing_tasks.splice(index, 1)


        }
        else {

            //remove from finished task array
            // let re_do_task = all_tasks[task_index]
            let re_do_task = current_task_tile.innerText
            const index_redo = finished_tasks.indexOf(re_do_task);
            finished_tasks.splice(index_redo, 1)

            //add to ongoing task array
            ongoing_tasks.push(re_do_task)
            console.log("added to ongoing", ongoing_tasks, re_do_task[0].value)

            status_btn.innerHTML = "Ongoing"

        }

    })

    console.log("all tasks list : ", all_tasks)
    console.log("finished tasks list : ", finished_tasks)
    console.log("ongoing list : ", ongoing_tasks)
    for (let i = 0; i < finished_tasks.length; i++) {
        console.log(finished_tasks)
        console.log(finished_tasks[i][0])
        console.log(finished_tasks[i][0].value)


    }


}




// Event to display all tasks
console.log("testtttt", ongoing_tasks)


let sort_all_btn = document.getElementById("sort-all")
sort_all_btn.addEventListener('click', function () {
    tasks_list.removeAttribute('class', 'hide-ul')
    tasks_list_ongoing.setAttribute('class', 'hide-ul')
    tasks_list_finished.setAttribute('class', 'hide-ul')

})



// Event to display finished tasks
console.log("testtttt", finished_tasks)
let count_click_finished=0;

let sort_finished_btn = document.getElementById("sort-finished")
sort_finished_btn.addEventListener('click', function () {
    count_click_finished+=1


    tasks_list.setAttribute('class', 'hide-ul')
    tasks_list_ongoing.setAttribute('class', 'hide-ul')
    tasks_list_finished.removeAttribute('class', 'hide-ul')

    if(count_click_finished==1){
        display_tasks(finished_tasks, tasks_list_finished, 'Finished')

    }

});


// Event to display ongoing tasks
console.log("testtttt", ongoing_tasks)
let count_click_ongoing=0;

let sort_ongoing_btn = document.getElementById("sort-ongoing")
sort_ongoing_btn.addEventListener('click', function () {
    count_click_ongoing+=1

    tasks_list.setAttribute('class', 'hide-ul')
    tasks_list_finished.setAttribute('class', 'hide-ul')
    tasks_list_ongoing.removeAttribute('class', 'hide-ul')
    if(count_click_ongoing==1){

        display_tasks(ongoing_tasks, tasks_list_ongoing,'Ongoing')
    }


});



//For Finished and Ongoing Taks display


//function to display ul
function display_tasks(array_tasks, ul_task_list, status) {

    //  display
    for (let i = 0; i < array_tasks.length; i++) {
        // ul_task_list.innerHTML=""

        let new_task_added = document.createElement('li')
        if (status == "Finished") {
            new_task_added.innerHTML = `
                            <button type="button" class="status-button finished-status ">Finished</button>
                            <span class="task-title"> ${array_tasks[i]}</span>
                            <i class="delete-finished-btn fas fa-trash-alt fa-xl" label="delete"></i> `
        }

        else {
            new_task_added.innerHTML = `
            <button type="button" class="status-button">Ongoing</button>
            <span class="task-title"> ${array_tasks[i]}</span>
            <i class="delete-finished-btn fas fa-trash-alt fa-xl" label="delete"></i> `
        }



        //add to all tasks ul to display
        ul_task_list.appendChild(new_task_added)
        console.log("ul ", ul_task_list)
        console.log('all tasks', array_tasks)


        //to delete task
        //   let btn_delete = document.getElementById(`delete-btn-${i}`)
        // let btn_delete = document.getElementsByClassName("delete-finished-btn")[i]

        // console.log(btn_delete)
        // btn_delete.addEventListener('click', function (e) {

        //     console.log("tst")
        //     console.log(finished_tasks[i]);

        //     const index = finished_tasks.indexOf(finished_tasks[i]);
        //     finished_tasks.splice(index, 1)

        //     e.target.closest('li').remove();

        // })
    }

}

//function to delete from finished or ongoing page


