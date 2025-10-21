import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Checkbox } from './Components/ui/checkbox.jsx'
import { Form } from './Components/ui/form.jsx'
import { useSelector,useDispatch } from 'react-redux'
import { addTodo, toggleTodo, deleteTodo } from './state-mangagement/todoSlice.js'




function App() {
  const [value, setValue] = useState("");
  const dispatch=useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
    dispatch(addTodo(value));
    setValue("");
    
  }

  return (
    <>
    <div>
      <form >
        <label htmlFor="todoInput">Enter Todo</label>
        <input
          id="todoInput"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "4px", width: "200px" }}
/>
        
        <button  type="submit" onClick={handleSubmit}
        style={{ backgroundColor: "#007bff", color: "white", padding: "8px 12px", borderRadius: "4px", marginLeft: "8px" }}
        >Add Todo</button>
      </form>
    </div>
    <div>
      <h2>Todo List</h2>
      <ul>
        {useSelector((state)=>state.todos).map((todo)=>(
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
