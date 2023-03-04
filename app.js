const form = document.querySelector('form');
const title = document.querySelector('#titleInput');
const description = document.querySelector('#descInput');

const container = document.querySelector('.container')

const list = document.querySelector('#todo-list')




let savedList = JSON.parse(localStorage.getItem('todo')) || [];
console.log(savedList)
// render items 

function render(){
    
    list.innerHTML = '';

    savedList.forEach((item) =>{
        let li = document.createElement('li');

        if(item.isDone){
            li.classList.add('completed')
        }
        let spanTitle = document.createElement('span');
        spanTitle.classList.add('title');
        let spanDesc = document.createElement('span');
        spanDesc.classList.add('desc')
        spanTitle.innerHTML = item.title;

        let divBody = document.createElement('div');
        divBody.classList.add('item-body')
        
        let deleteSpan = document.createElement('i');
        deleteSpan.classList.add('fa')
        deleteSpan.classList.add('fa-trash')

        let updateSpan = document.createElement('i');
        updateSpan.classList.add('fa-sharp');
        updateSpan.classList.add('fa-solid');
        updateSpan.classList.add('fa-pen');

        
        spanDesc.innerHTML = item.description;
        
        divBody.appendChild(spanTitle);
        divBody.appendChild(spanDesc);
        li.appendChild(divBody);
        li.appendChild(updateSpan);
        li.appendChild(deleteSpan);
        

        deleteSpan.addEventListener("click", () => deleteTask(item.id))
        updateSpan.addEventListener('click',()=> updateTask(item.id))
        li.addEventListener('click',() => completeTask(item.id) )

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


const updateTask = (id) =>{
    let updatedTask = savedList.find(task => task.id == id);
     title.value = updatedTask.title;
     description.value = updatedTask.description;

    deleteTask(id);
}

const completeTask = (id) => {
   let completedTask =  savedList.find(item => item.id == id);
    completedTask.isDone = !completedTask.isDone;
     localStorage.setItem('todo', JSON.stringify(savedList));
     render();
}

