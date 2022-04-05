const form = document.querySelector("#toDo-submit");
const title = document.querySelector("#new-toDo-title");
const description = document.querySelector("#new-toDo-description");
const list_el = document.querySelector("#toDos");
// const edit_btn_all = document.querySelector(".edit");
// const delete_todo = document.getElementById("delete-btn");
// console.log(edit_btn_all)

document.addEventListener('DOMContentLoaded', getTodos);
form.addEventListener('click', addTodo);
list_el.addEventListener('click', removeOrEditTodo);

function addTodo(){
    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
        
    const toDo_title = title.value;
    const toDo_description = description.value;

    if (!toDo_title || !toDo_description){
        alert("Title or Description cannot be empty")
        return;
    }
    // else{
    //     console.log(`Added new ToDo of title '${toDo_title}'`)
    // }

    const toDo_el = document.createElement("div");
    toDo_el.classList.add("toDo");

    const toDo_content_title_el = document.createElement("div") ;
    toDo_content_title_el.classList.add("toDo-title");
    toDo_content_title_el.innerText = toDo_title;
    // toDo_el.appendChild(toDo_content_title_el);

    const toDo_title_el = document.createElement("input");
    toDo_title_el.classList.add("toDo-list-text");
    toDo_title_el.type = "text";
    toDo_title_el.value = toDo_title;
    toDo_title_el.setAttribute("readonly", "readonly");


    const toDo_content_description_el = document.createElement("div") ;
    toDo_content_description_el.classList.add("toDo-description");
    toDo_content_description_el.innerText = toDo_description;

    const toDo_description_el = document.createElement("textarea");
    toDo_description_el.classList.add("toDo-list-text");
    toDo_description_el.type = "text";
    toDo_description_el.value = toDo_description;
    toDo_description_el.setAttribute("readonly", "readonly");

    toDo_el.appendChild(toDo_title_el);
    toDo_el.appendChild(toDo_description_el);

    saveLocalToDos(toDo_title, toDo_description)


    const toDo_actions_el = document.createElement("div");
    toDo_actions_el.setAttribute('id','actions-btn')
    toDo_actions_el.classList.add("actions");

    const toDo_edit_el = document.createElement("button");
    toDo_edit_el.classList.add("edit", "edit-btn", "btn", "btn-secondary", "bottom-center");
    toDo_edit_el.innerHTML = "Edit";
    const toDo_delete_el = document.createElement("button");
    toDo_delete_el.classList.add("delete", "delete-btn", "btn", "btn-danger");
    toDo_delete_el.innerHTML = "Delete";

    toDo_actions_el.appendChild(toDo_edit_el);
    toDo_actions_el.appendChild(toDo_delete_el);

    toDo_el.appendChild(toDo_actions_el);

    list_el.appendChild(toDo_el);
    // console.log(list_el[1])

    title.value = "";
    description.value = "";

    // toDo_edit_el.addEventListener('click', () => {
    //     if(toDo_edit_el.innerText.toLowerCase() == "edit"){
    //         toDo_title_el.removeAttribute("readonly");
    //         toDo_description_el.removeAttribute("readonly");

    //         toDo_title_el.focus();
    //         toDo_edit_el.innerText = "Save";
    //         toDo_edit_el.classList.add("edit-btn-alone-center", "btn-success")

    //         toDo_actions_el.removeChild(toDo_delete_el)


    //     }
    //     else{
    //         toDo_title_el.setAttribute("readonly", "readonly");
    //         toDo_description_el.setAttribute("readonly", "readonly");

    //         toDo_actions_el.appendChild(toDo_delete_el);
    //         toDo_edit_el.classList.remove("edit-btn-alone-center", "btn-success")
    //         toDo_edit_el.innerText = "Edit"
    //     }
    // });

    // toDo_delete_el.addEventListener('click', () => {
    //     removeLocalTodos(toDo_delete_el, list_el, toDo_el)
    //     console.log("hi")
    //     // list_el.removeChild(toDo_el);
    //     // removeLocalTodos(toDo_el)
    // })
}; 

function removeOrEditTodo(e){
    // console.log(e)
    const item = e.target;
    if(item.classList[0] === 'delete'){
        // console.log("Delete clicked")
        const todo = item.parentElement.parentElement;
        // console.log(item)
        // console.log(todo)
        todo.remove()
        removeLocalTodos(todo)
    }
    else if(item.classList[0] === 'edit')   {
        // console.log("Edit clicked")
        const todo = item.parentElement.parentElement;
        const toDoTitle_el = todo.children[0];
        const toDoDescription_el = todo.children[1];
        const toDoActionBtns_el = todo.children[2];
        const toDoEdit_el = todo.children[2].children[0];
        // const toDoDelete_el = todo.children[2].children[1];
        const edit_btn_all = document.querySelectorAll(".edit-btn");
        const delete_btn_all = document.querySelectorAll(".delete-btn");
        // console.log(toDoTitle_el.value)
        // const edit_btn_all = document.querySelector(".actions");
        // console.log(action_btn_todo)
        // console.log(item)



        if(toDoEdit_el.innerText.toLowerCase() == "edit"){

            toDoTitle_el.removeAttribute("readonly")
            toDoDescription_el.removeAttribute("readonly")

            toDoTitle_el.focus();

            toDoEdit_el.innerText = "Save";
            toDoEdit_el.classList.remove("edit-btn")
            toDoEdit_el.classList.add("mx-auto", "btn-success", "btn-lg")

            edit_btn_all.forEach(function(item){
                if (item !== toDoEdit_el){
                    console.log(item)
                    item.style.display = "none";
                }
            })
            delete_btn_all.forEach(function(item){
                item.style.display = "none";
            })
            // toDoDelete_el.style.display = "none";

            let todos = checkExistingTodos()
            window.todoEditIndex = getIndexofTodo(todos, todo)
        }

        else{
                toDoTitle_el.setAttribute("readonly", "readonly");
                toDoDescription_el.setAttribute("readonly", "readonly");

                toDoEdit_el.classList.add("edit-btn")
                toDoEdit_el.classList.remove("mx-auto", "btn-lg", "btn-success")
                toDoEdit_el.innerText = "Edit"

                edit_btn_all.forEach(function(item){
                    if (item !== toDoEdit_el){
                        console.log(item)
                        item.style.display = "";
                    }
                })
                delete_btn_all.forEach(function(item){
                    item.style.display = "";
                })
                // toDoDelete_el.style.display = "";
                editLocalTodos(todo, todoEditIndex)
        }
    } 
}

function checkExistingTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function NoTodosToDisplay(){
    const noToDo_el = document.createElement("div");
    noToDo_el.classList.add("no-todos-to-display");
    noToDo_el.innerText = "No ToDos to Display";
    list_el.appendChild(noToDo_el);
}

function saveLocalToDos(todo_title, todo_desc){
    todos = checkExistingTodos()
    todos.push([todo_title, todo_desc])
    // console.log(todos)
    localStorage.setItem('todos', JSON.stringify(todos))
}

        
function getTodos(){
    todos = checkExistingTodos()
    if(todos.length == 0){
        NoTodosToDisplay()
        // console.log("no todos to load")
    }
    todos.forEach(function(todos){
        const toDo_el = document.createElement("div");
        toDo_el.classList.add("toDo");

        const toDo_content_title_el = document.createElement("div") ;
        toDo_content_title_el.classList.add("toDo-title");
        toDo_content_title_el.innerText = todos[0];

        const toDo_title_el = document.createElement("input");
        toDo_title_el.classList.add("toDo-list-text");
        toDo_title_el.type = "text";
        toDo_title_el.value = todos[0];
        toDo_title_el.setAttribute("readonly", "readonly");
        // console.log(toDo_title_el)

        const toDo_content_description_el = document.createElement("div") ;
        toDo_content_description_el.classList.add("toDo-description");
        toDo_content_description_el.innerText = todos[1];

        const toDo_description_el = document.createElement("textarea");
        toDo_description_el.classList.add("toDo-list-text");
        toDo_description_el.type = "text";
        toDo_description_el.value = todos[1];
        toDo_description_el.setAttribute("readonly", "readonly");

        toDo_el.appendChild(toDo_title_el);
        toDo_el.appendChild(toDo_description_el);

        const toDo_actions_el = document.createElement("div");
        toDo_actions_el.classList.add("actions");
        toDo_actions_el.setAttribute('id','actions-btn')

        const toDo_edit_el = document.createElement("button");
        toDo_edit_el.classList.add("edit", "edit-btn", "btn", "btn-secondary", "bottom-center");
        toDo_edit_el.setAttribute('id','edit-btn')
        // toDo_edit_el.setAttribute("onclick", "editLocalTodos()")
        toDo_edit_el.innerHTML = "Edit";
        const toDo_delete_el = document.createElement("button");
        toDo_delete_el.classList.add("delete", "delete-btn", "btn", "btn-danger");
        toDo_delete_el.setAttribute('id','delete-btn')
        // toDo_delete_el.setAttribute("onclick", "removeLocalTodos()" )
        toDo_delete_el.innerHTML = "Delete";

        toDo_actions_el.appendChild(toDo_edit_el);
        toDo_actions_el.appendChild(toDo_delete_el);

        toDo_el.appendChild(toDo_actions_el);

        list_el.appendChild(toDo_el);
    })
}

// function getTod(){
//     todos = checkExistingTodos()
//     let str = "";
//     todos.forEach((element, index) => {
//         str += `
//         <div class="toDo">
//             <div class="content">
//               <div class="toDo-title">
//                 <input type="text" class="toDo-list-text" value="${element[0]}" readonly>
//               </div>
//               <div class="toDo-description">
//                 <input type="text" class="toDo-list-text" value="${element[1]}" readonly>
//               </div>
//             </div>
//               <div class="actions">
//                 <button type="button" id="edit-btn" class="edit btn btn-secondary bottom-center" onclick="testEdit()" >Edit</button>
//                 <button type="button" id="delete-btn" class="delete btn btn-danger" onclick="removeLocalTodos(${index})">Delete</button>
//               </div>
//           </div>
//         `
//         list_el.innerHTML = str
//     })
// }

// function editLocalTodos(todo){
//     console.log(edit_todo)
// }

function getIndexofTodo(todos, todo){
    const todoTitle = todo.children[0].value;
    for(let i=0; i < todos.length; i++){
        let todoItem = todos[i];
        for(let j=0; j< todoItem.length; j++){
            if (todoTitle == todoItem[j]){
                // console.log(i)
                return (i)                
            }
        }
        if(todos.length == 0){
            NoTodosToDisplay();
            break;
        }
    }
}

function editLocalTodos(todo, todoEditIndex){
    let todos = checkExistingTodos()
    const toDoTitle_el = todo.children[0];
    const toDoDescription_el = todo.children[1];
    console.log(todoEditIndex)
    todos.splice(todoEditIndex, 1, [toDoTitle_el.value, toDoDescription_el.value]);
    console.log(todos)
    localStorage.setItem("todos", JSON.stringify(todos));
}

// function removeLocalTodos(itemIndex){
//     let todos = checkExistingTodos()
//     todos.splice(itemIndex, 1)
//     // localStorage.setItem('todos')
// }

function removeLocalTodos(todo){
    let todos = checkExistingTodos()
    todoIndex = getIndexofTodo(todos, todo)
    todos.splice(todoIndex, 1);
    console.log(todos)
    localStorage.setItem("todos", JSON.stringify(todos));
    if(todos.length == 0){
        NoTodosToDisplay();
    }

    // const todoTitle = todo.children[0].value;
    // for(let i=0; i < todos.length; i++){
    //     let todoItem = todos[i];
    //     for(let j=0; j< todoItem.length; j++){
    //         if (todoTitle == todoItem[j]){
    //             // console.log(i)
    //             todos.splice(i, 1);
    //             // console.log(todos)
    //             localStorage.setItem("todos", JSON.stringify(todos));  
    //             break;              
    //         }
    //     }
    //     if(todos.length == 0){
    //         NoTodosToDisplay();
    //         break;
    //     }
    // }

    // const todoDescription = todo.children[1].value;

    // todosString = JSON.stringify(todos)
    // console.log(todoTitle)


    // console.log(todosString.indexOf(todo.children[0].children[0].children[0].value))
    // const todoDescriptionIndex = todo.parentElement.children[1].value; 
    // todoTitleIndex = todos.indexOf(todoTitle)
    
    // console.log(todoTitleIndex)

    // console.log(typeof(todos))
    // console.log(todos.indexOf(todo.children[0].value))
    // console.log(todoTitle)
    // todos.remove(todo.children)
    // todos.splice(todos.indexOf(todoTitle), 1);
    // console.log(todos)
    // localStorage.setItem("todos", JSON.stringify(todos));
    // localStorage.removeItem(todo.parentElement)
    // toDo_delete_el.addEventListener('click', () => {
    //     console.log("hi")
    //     list_el.removeChild(toDo_el);
    // })
}

