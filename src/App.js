import React, {useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
import {v4 as uuidV4} from 'uuid';

function App() {
const [todos, setTodos] = useState([]);
const toDoNameRef = useRef();
const LOCAL_STORAGE_KEY = 'todoApp.todos'

useEffect(() =>{
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if(storedTodos) setTodos(storedTodos)
}, [])

useEffect(() =>{
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])

function toggleTodo(id) {
  const newToDos = [...todos];
  const todo = newToDos.find(todo => todo.id === id);
  todo.complete = !todo.complete;
  setTodos(newToDos);
}

function handleAddToDo(e) {
  const name = toDoNameRef.current.value;
  if ( name === "") return;
  setTodos(prevTodos => {
    return [...prevTodos, {id: uuidV4(), name: name, complete: false}]
  });
  toDoNameRef.current.value = null;
}

function handleClearToDos(){
  const newToDose = todos.filter(todo => !todo.complete);
  setTodos(newToDose);
}
  return (
    <>
    <ToDoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={toDoNameRef}type="text"/>
    <button onClick={handleAddToDo}>Add Todo</button>
    <button onClick={handleClearToDos}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
    

  )
}

export default App;
