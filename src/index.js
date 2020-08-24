// Set up index.html to load the bundle --DONE
// Make sure to load uuid via an npm module when necessary --DONE

// --

// Add necessary imports

import { getFilters, setFilters } from  './filters'
import { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo } from  './todos'
import { renderTodos, generateTodoDOM, generateSummaryDOM } from  './views'

// Render initial todos

//generateSummaryDOM()
renderTodos()

// Set up search text handler
document.querySelector('#search_text').addEventListener('input', (e) => {
    
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

// Set up checkbox handler
document.querySelector('#hide_complete').addEventListener('change', (e) => {
    
    setFilters({
        hideComplete: e.target.checked
    })
    renderTodos()

})  

// Set up form submission handler
const formEl = document.querySelector('#new_todo_form')

formEl.addEventListener('submit', (e) => {

    e.preventDefault()
    
    const text = e.target.elements.newTodo.value.trim()

    if (text.length > 0) {
        
        createTodo(text)
        saveTodos()
    }

    

    renderTodos()
    //generateSummaryDOM()
    
    e.target.elements.newTodo.value= ''
    
})

// Bonus: Add a watcher for local storage
window.addEventListener('storage', (e) => {

    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})


