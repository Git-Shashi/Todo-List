import { useState,useEffect } from 'react'

import './App.css'
import { Checkbox } from './Components/ui/checkbox.jsx'
import { Form } from './Components/ui/form.jsx'
import { useSelector,useDispatch } from 'react-redux'
import { addTodo, toggleTodo, deleteTodo ,setTodos } from './state-mangagement/todoSlice.js'




function App() {
  const [value, setValue] = useState("");
  const todos=useSelector((state)=>state.todos);
  const dispatch=useDispatch();
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      console.log("Loaded todos from localStorage:", JSON.parse(storedTodos));
      dispatch(setTodos(JSON.parse(storedTodos)));
      
    }
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    
  }, [todos]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
   dispatch(addTodo(value));
  setValue("");
  }

  return (
    <>
    <div>
      <form onSubmit={handleSubmit} >
        <label htmlFor="todoInput">Enter Todo</label>
        <input
          id="todoInput"
          type="text"
          value={value}
          onChange={(e) => {  console.log("value is changed" ) ;
            setValue(e.target.value) }}
          style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "4px", width: "200px" }}
> </input>
        
        <button  type="submit" 
        style={{ backgroundColor: "#007bff", color: "white", padding: "8px 12px", borderRadius: "4px", marginLeft: "8px" }}
        >Add Todo</button>
      </form>
    </div>
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo)=>(
          <li key={todo.id} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <Checkbox 
              checked={todo.completed} 
              onCheckedChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none", marginLeft: "8px", flexGrow: 1 }}>
              {todo.text}
            </span>
            <button 
              onClick={() => dispatch(deleteTodo(todo.id))}
              style={{ backgroundColor: "#dc3545", color: "white", padding: "4px 8px", borderRadius: "4px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul> 
    </div>
    </>
  )
}

export default App
