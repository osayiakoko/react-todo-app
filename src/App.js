import { useState, useEffect } from 'react'
import TodoList from './components/TodoList'

const App = () => {
  const [todos, setTodos] = useState([])
  const [todoName, setTodoName] = useState("")

  useEffect(() => {
    const getTodos = async () => {
      const todos = await fetchTodos()
      setTodos(todos)
    }
    getTodos()
  }, [])

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:5000/todos')
    const data = await res.json()

    return data
  }

  const addTodo = async (e) => {
    if(e.type==="keypress" && e.key !== "Enter") {
      return
    }

    if (todoName.trim().length < 1 ){
      alert("Field cannot be empty")
      return
    }else{
      const res = await fetch("http://localhost:5000/todos",{
        method: 'POST',
        headers: {
          "Content-type": 'application/json',
        },
        body: JSON.stringify({name: todoName, done: false})
      })

      const data = await res.json()

      setTodos([...todos, data])
      setTodoName("")
    }
  }

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE"
    })
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleDone = async (id) => {
    const todo = todos.find(todo => todo.id === id)
    const toggledTodo = {...todo, done: !todo.done}

    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(toggledTodo)
    })

    const data = await res.json()
    setTodos(todos.map(todo => todo.id === id ? data : todo))
  }

  return (
    <div>
      <header>
          <h2>todo app</h2>
      </header>
      <div className="container">
        { 
          todos.length ? 
            <TodoList todos={todos} onDelete={deleteTodo} onToggleDone={toggleDone} />
          : 
            <h4>No todos</h4>
        }
        <input 
          type="text" 
          className="textfield" 
          value={todoName} 
          onChange={(e) => setTodoName(e.target.value)}
          onKeyPress={addTodo} 
        />
        <button onClick={ addTodo }>ADD</button>
      </div>
    </div>
  );
}

export default App;
