import { saveTodos, getTodos, removeTodo, filterTodos, toggleTodo } from './todos'
import { getFilters } from './filters'

// renderTodos
// Arguments: none
// Return value: none

const renderTodos = () => {
    let filters = getFilters()
    let todos = getTodos()
    
    let results = filterTodos(todos, filters)
    
    const todoEl = document.querySelector('#note-holder')
    todoEl.innerHTML = ''

    if (results.length > 0) {
        
        results.forEach((todo) => {
            let todoDOM = generateTodoDOM(todo)
            todoEl.appendChild(todoDOM)
            
        })    
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No To-dos to show!'
        todoEl.appendChild(emptyMessage)
    }
}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element

const generateTodoDOM = (todo) => {
    
    //create holding div
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const boxEl = document.createElement('input')
    const texEl = document.createElement('span')
    const button = document.createElement('button')

    //create checkbox
    
    boxEl.setAttribute('type', 'checkbox')
    boxEl.classList.add('input')
    boxEl.checked = todo.completed
    containerEl.appendChild(boxEl)

    boxEl.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos()
        renderTodos()
        generateSummaryDOM()
    })
    
    //create body span
    
    texEl.textContent = todo.text
    texEl.classList.add('list-item__title')
    containerEl.appendChild(texEl)
    

    //container setup
    
    todoEl.classList.add('list-item')
    todoEl.appendChild(containerEl)
    

    //create button (set text)
    
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    todoEl.appendChild(button)
    button.addEventListener('click', () => {
        removeTodo(todo.id)
        generateSummaryDOM()
        renderTodos()
    })

    
    
    return todoEl  //originally todoEl
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element

const generateSummaryDOM = () => {

    const counter = document.querySelector('#counter')

    let count= getTodos().filter( object => !object.completed).length
    count === 1 ? counter.textContent = `you have ${count} todo remaining` : counter.textContent = `you have ${count} todos remaining`
    
    

    return counter
}

// Make sure to set up the exports

export { renderTodos, generateTodoDOM, generateSummaryDOM }                                                                                                                                                                                                                                                                                                                               