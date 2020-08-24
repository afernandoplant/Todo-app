import { v4 as uuidv4 } from 'uuid'

// Setup the empty todos array


// loadTodos
// Arguments: none
// Return value: none
const loadTodos = () => {

    const todosJSON = localStorage.getItem('todos')
    
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (error) {
        return []
    }

}

// saveTodos
// Arguments: none
// Return value: none
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

let todos = []
todos = loadTodos()

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos


//filter todos
const searchfunc = (todo, filters) => {
    let isSearchTarget = todo.text.toLowerCase().includes(filters.searchText)
    
    if (!filters.hideComplete) {
       return isSearchTarget
    } else {
        return isSearchTarget && !todo.completed
    }
}

const filterTodos = (todos, filters) => {
    let filteredTodos = []
    
    filteredTodos = todos.filter((todo) => searchfunc(todo, filters))
    
    return filteredTodos
}

// createTodo
// Arguments: todo text
// Return value: none
const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text: `${text}`,
        completed: false
    })

    saveTodos()
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
}
// Make sure to call loadTodos and setup the exports
export { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo, filterTodos }