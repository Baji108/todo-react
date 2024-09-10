import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

function App() {
  const [count, setCount] = useState(0)
  const [todo, setTodo] = useState("")       //input text
  const [todos,setTodos] = useState([])  //holds all the todos
  const [showFinished,setShowFinished]=useState(true)

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  
const saveTOLS=(params) => {
  localStorage.setItem("todos",JSON.stringify(todos)) //saves the todos in string format,here "todos" is the key
}

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveTOLS()
  }

  const handleEdit=(e,id)=>{
    let t=todos.filter((i)=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!=id;
    })
    setTodos(newTodos)
    saveTOLS()
  }

  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!=id;
    }

    );
    setTodos(newTodos)
    saveTOLS()
  }

  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let newTodos=[...todos];   //if we did let newTodos=todos ,the reference would be same and it would not render in the output so we have to use [...todos] to re render the state
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTOLS()
  }

  const toggleFinished=(e) => {
    setShowFinished(!showFinished)
  }
  

  return (
    <>
    <Navbar />
    <div className="container mx:3 md:mx-auto my-5 rounded-xl p-5 bg-cyan-200 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>iTask-Manage Your Todos at One Place</h1>
        <div className='Add Todo flex flex-col gap-4 my-4'>
          <h2 className='font-bold '>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type='text' className='w-full'></input>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-slate-800 text-white hover:font-semibold rounded-md p-2 py-1 transition-all'type='submit'>Save</button>
          </div>
          <input onChange={toggleFinished} type='checkbox' checked={showFinished}/>Show Finished
          <div className='h-[1px] bg-black w-[90%] mx-auto my-2'></div>
          <h2 className='text-lg font-bold'>Your Todos</h2>
          <div className="todos">
          {todos.length===0 && <div>No todos to display</div>}
            {todos.map(item=>{
            return(!item.isCompleted || showFinished) && <div key={item.id} className="todo flex my-2 md:w-1/2 justify-between">
              <div className='flex gap-4'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-slate-800 text-white hover:font-semibold rounded-md mx-1 p-2 py-1 transition-all'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id) /* we can pass the id(item.id) to the handleDelete function  */ }} className='bg-slate-800 text-white hover:font-semibold rounded-md mx-1 p-2 py-1 transition-all '><RiDeleteBin5Fill /></button>
              </div>
            </div>
          })}
        </div>
    </div>
      
    </>
  )
}

export default App
