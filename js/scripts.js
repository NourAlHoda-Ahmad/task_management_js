let input_task = document.getElementsByName("input-task")[0]
let input_priority = document.getElementById("priority")
let add_btn = document.getElementById("add-task-btn");
let tasks_list = document.getElementsByClassName('tasks-list')[0]
let tasks_list_finished=document.getElementsByClassName('tasks-list')[1]

// let all_tasks=[];
let ongoing_tasks=[];
let finished_tasks=[];


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


    //add task all_tasks list and ongoing tasks lists
    // all_tasks.push(input_task.value);
    // console.log('all tasks', all_tasks)
    ongoing_tasks.push(input_task.value);
    console.log('ongoing tasks', ongoing_tasks)

    //clear input field
    input_task.value = ""




    let task_index= counter_nb_of_tasks-1
    let current_task_tile = document.getElementsByClassName('task-title')[task_index]

    //function to remove task
    console.log("index",task_index)
    let delete_btn = document.getElementsByClassName('delete-btn')[task_index]
    console.log("test",delete_btn)

    delete_btn.addEventListener('click', function (e) {

       
        
        let removed_task= ongoing_tasks.splice(task_index,1)
        console.log("deleted from all tasks",ongoing_tasks,removed_task[0])

        console.log("trying to delete")
         e.target.closest('li').remove();
        counter_nb_of_tasks-=1;



    })


    // function to edit task title
    let edit_btn = document.getElementsByClassName('edit-btn')[task_index]
    // let current_task_tile = document.getElementsByClassName('task-title')[task_index]
    // let current_priority = edit_btn.previousElementSibling;
    // let current_due_date = current_priority.previousElementSibling;
    // let current_task_tile = current_due_date.previousElementSibling;
    console.log(current_task_tile)

    edit_btn.addEventListener('click', function (e) {
        console.log("trying to edit")
        let new_task_title = prompt("Please enter the new task name :")
        current_task_tile.innerHTML=new_task_title

    })


    // function to change task status
    let status_btn=document.getElementsByClassName('status-button')[task_index]
    console.log(status_btn)

    status_btn.addEventListener('click', function (e) {
        console.log("trying to change status")

        status_btn.classList.toggle("finished-status")
        if(status_btn.innerHTML=="Ongoing"){

            console.log(task_index)

            status_btn.innerHTML="Finished"
            // let done_task= ongoing_tasks.splice(task_index,1)
            // // console.log("removed from ongoing",ongoing_tasks,done_task[0])

            let done_task=current_task_tile.innerText
            finished_tasks.push(done_task)
            console.log("added to finished",finished_tasks)
            



        }
        else{

            let re_do_task=current_task_tile.innerText
            const index = finished_tasks.indexOf(re_do_task); 
            finished_tasks.splice(index,1)

            console.log("added to finished",finished_tasks)
            status_btn.innerHTML="Ongoing"

        }
       

    })

 

  
}


          //function to display finished tasks

console.log("testtttt",finished_tasks)
let sort_finished_btn=document.getElementById("sort-finished")
sort_finished_btn.addEventListener('click',function(){
    for (let i = 0; i < finished_tasks.length; i++) {
        console.log(finished_tasks[i]);

  let new_task_added = document.createElement('li')
  new_task_added.innerHTML = `
              <button type="button" class="status-button .finished-status">Finished</button>
              <span class="task-title"> ${finished_tasks[i]}</span>
              <span class="due-date">10-11-23</span>
              <button type="button" class="priority-btn high-priority" >${finished_tasks[i]}</button>
              <i class="edit-btn fas fa-edit fa-xl"></i>
              <i class="delete-btn  fas fa-trash-alt fa-xl" label="delete"></i> `

  console.log(tasks_list)
  tasks_list_finished.appendChild(new_task_added)
    }

})




