const form = document.querySelector('form');
const title = document.querySelector('#titleInput');
const description = document.querySelector('#description');

const container = document.querySelector('.container')

const list = document.querySelector('#todo-list')




let savedList = JSON.parse(localStorage.getItem('todo')) || [];
console.log(savedList)
// render items 

function render(){
    
    list.innerHTML = '';

    savedList.forEach((item) =>{
        let li = document.createElement('li');
        let spanTitle = document.createElement('span');
        spanTitle.classList.add('title');
        let spanDesc = document.createElement('span');
        spanDesc.classList.add('desc')
        spanTitle.innerHTML = item.title;
        
        let deleteSpan = document.createElement('i');
        deleteSpan.classList.add('fa')
        deleteSpan.classList.add('fa-trash')

        
        spanDesc.innerHTML = item.description;
        
        li.appendChild(spanTitle);
        li.appendChild(spanDesc);
        li.appendChild(deleteSpan);

        deleteSpan.addEventListener("click", () => deleteTask(item.id))

        list.appendChild(li)
    })
}

 render();






form.addEventListener('submit', event => {
    event.preventDefault();

    if (!title.value){
        alert('please enter the title')
        return
    }
    let newTodo = {
        title: title.value,
        description: description.value,
        id: Date.now(),
        isDone: false,
    }

    addTodo(newTodo);
    
    form.reset();



});

const addTodo = (item) => {
    savedList.push(item);
    localStorage.setItem('todo', JSON.stringify(savedList));
    render();

}

const deleteTask = (id) => {
    savedList = savedList.filter(task => task.id !== id);
    localStorage.setItem('todo', JSON.stringify(savedList));
    render();
}

// const getFromLocalStorage = () => {
//     const todos = JSON.parse(localStorage.getItem('todo'))
//    // console.log(todos);
//     return todos
// }