import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  const [count, setCount] = useState(0)

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)


  // Saving todos to Local Storage (not saving to database like mongodb)

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }
  const handleEdit = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    setTodo(todos[index].todo)
    let newTodo = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodo)
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }
  const handleSave = () => {
    // It creates a new array using the spread operator [...] to include all existing todos.
    // It adds a new object {todo, isCompleted: false} at the end of this new array. This object 
    // represents the new todo item. The todo property is set to the current value of the todo state, 
    // and isCompleted is set to false initially.
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(newTodos)
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <Navbar />
      <div className='container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]'>
        <h1 className='text-3xl font-bold text-center'>iTask - Manage you todos</h1>
        <div className="addTodo my-5">
          <h2 className='text-xl font-bold my-4'>Add a Todo</h2>
          <div className='flex flex-col items-center'>
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1 mx-4 my-1' />
            <button onClick={handleSave} disabled={todo.length <= 3} className='w-full font-bold disabled:bg-violet-500 mx-4 my-1 bg-violet-800 hover:bg-violet-950 px-3 py-1 rounded-lg text-white'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='my-2'/> Show finished
        <h2 className='text-xl font-bold my-2'>Your Todos</h2>
        <div className="todos h-auto">
          {todos.length === 0 && <div>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex gap:10px justify-between my-5 w-full h-auto lg:w-4/5">
              <div className='flex gap-5 items-center'>
                <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex mx-10">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='font-bold bg-violet-800 hover:bg-violet-950 px-3 py-1 rounded-lg text-white mx-1 h-8'><FaEdit /></button>
                {/* New formatmof onClick with parameters */}
                <button onClick={(e) => { handleDelete(e, item.id) }} className='font-bold bg-violet-800 hover:bg-violet-950 px-3 py-1 rounded-lg text-white mx-1 h-8'><MdDelete /></button>
              </div>
            </div>


          })}
        </div>
      </div>
    </>
  )
}

export default App
