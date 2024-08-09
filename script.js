'use strict';

let $ = document
const addTodo = $.getElementById('addButton')
const input = $.getElementById('itemInput')
const todoList = $.getElementById('todoList')
const clearBtn = $.getElementById('clearButton')
const btnComplete = $.getElementById('completeBtn')
const btnDelete = $.getElementById('deleteBtn')
const error = $.querySelector('.error')

let todos = [

]

function addNewTodo() {   
    let inputValue = input.value

    let newTodoObj = {
        id: todos.length + 1,
        content: inputValue,
        complete: false
    }
    
    todos.push(newTodoObj)
    setLocalStorage(todos)
    todosGenerator(todos)
    onload1(todos)
}

function setLocalStorage(todos) {
    localStorage.setItem('todo', JSON.stringify(todos))
}

function todosGenerator(todos) {
    let newLi, newLabel, newStatusBtn, newDeleteBtn

    todoList.innerHTML = ''

    todos.forEach(function(todo) {
        newLi = $.createElement('li')
        newLi.className = 'well'
    
        newLabel = $.createElement('label')
        newLabel.innerHTML = todo.content
        newLabel.className = 'test'
    
        newStatusBtn = $.createElement('button')
        newStatusBtn.innerHTML = 'Complete'
        newStatusBtn.className = 'btn btn-success'
        newStatusBtn.setAttribute('onclick', 'complete(' + todo.id + ')')

        newDeleteBtn = $.createElement('button')
        newDeleteBtn.className = 'btn btn-danger'
        newDeleteBtn.innerHTML = 'Delete'
        newDeleteBtn.setAttribute('onclick', 'removeTodo(' + todo.id + ')')

        if (todo.complete === false) {
            newLi.className = 'uncompleted well'
            newStatusBtn.innerHTML = 'unComplete'
        }

        newLi.append(newLabel, newStatusBtn, newDeleteBtn)
        todoList.append(newLi)
    });
}

function removeTodo(todosId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todo'))

    todos = localStorageTodos

    let mainTodoIndex = todos.findIndex(function (todo) {
        return todo.id === todosId
    })

    todos.splice(mainTodoIndex, 1)

    setLocalStorage(todos)
    todosGenerator(todos)
}

function complete(todoStatus) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todo'))

    todos = localStorageTodos
    
    let findIndex = todos.findIndex(function(todo) {
        if (todo.id === todoStatus) {
            todo.complete = !todo.complete
        }
    })

    setLocalStorage(todos)
    todosGenerator(todos)
}

function onload1() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todo'))

    if (localStorageTodos) {
        todos = localStorageTodos
    } else {
        todos = []
    }

    todosGenerator(todos)
}

function clearTodos() {
    todos = []
    todosGenerator(todos)
    localStorage.removeItem('todo')
}

function enterTodo(event) {
    if (event.key === 'Enter') {
        addNewTodo()
    }
}

window.addEventListener('load', onload1)
addTodo.addEventListener('click', addNewTodo)
clearBtn.addEventListener('click', clearTodos)
input.addEventListener('keydown', enterTodo)
