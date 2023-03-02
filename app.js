const form = document.querySelector('form');
const title = document.querySelector('#titleInput');
const description = document.querySelector('#description');

const list = document.querySelector('#todo-list')




let savedList = JSON.parse(localStorage.getItem('todo')) || [];
console.log(savedList)
// render items 

function render(){

    savedList.forEach((item) =>{
        let li = document.createElement('li');
        let spanTitle = document.createElement('span');
        let spanDesc = document.createElement('span');

        spanTitle.innerHTML = item.title;
        spanTitle.classList.add('title');
        spanDesc.innerHTML = item.description;
        spanDesc.classList.add('desc')
        li.appendChild(spanTitle);
        li.appendChild(spanDesc);

        list.appendChild(li)
    })
}

// render();






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

    render();


});

const addTodo = (item) => {
    savedList.push(item);
    localStorage.setItem('todo', JSON.stringify(savedList));
}

const getFromLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem('todo'))
   // console.log(todos);
    return todos
}