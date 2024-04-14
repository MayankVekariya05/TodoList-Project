import React ,{useEffect, useState} from "react";
import "./Body.css";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Body = () => {


const handleOnChange = (e) =>{
    setTodo(e.target.value)
}
const handleSubmit = () => {
  setTodos([...todos,{id:uuidv4(),todo,isCompleted: true}])
  setTodo('')
  saveToLs()
}
const handleEdit = (e,id) => {
  let t = todos.filter(i=>{
    return i.id ===id
  });
  setTodo(t[0].todo)
  let newTodos = todos.filter(item=>{
    return item.id !==id
  });
  setTodos(newTodos)
  saveToLs()
}
const handleDelete = (e,id) => {
  let newTodos = todos.filter(item=>{
    return item.id !==id
  });
  setTodos(newTodos)
  // window.confirm("you wan'to delete?")
}
const handleCheckbox = (e) => {
  let id = e.target.name
  let idx = todos.findIndex(item =>{
    return item.id === id;
  })
  let newTodos = [...todos];
  newTodos[idx].isCompleted = !newTodos[idx].isCompleted;
  setTodos(newTodos)
  saveToLs()
}

  const saveToLs = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }


useEffect(()=>{
  let todoString = localStorage.getItem("todos")
  if(todoString){
  let todos = JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)
  }
},[])

const toggleFinished = () => {
  setshowFinished(!showFinished)
}


const [todo,setTodo] = useState('');
const [todos,setTodos] = useState([]) 
const [showFinished, setshowFinished] = useState(true)


  return (
    <>
      <div className="main" >
        <h1>iTask - Manage your todos at one place</h1>

        <div className="container">
          <h2 className="heading">add a Todo</h2>
          <div className="input">
            <input type="text" value={todo} onChange={handleOnChange} />
            <button className="btn" onClick={handleSubmit} disabled={todo.length<=1}>save</button>
          </div>
          <hr />
          <div className="checkboxes">
            <input type="checkbox" className="chbox" checked={showFinished} onChange={toggleFinished} />Show Finished
          </div>
          <h2>Your Todos</h2>
          <br />

          {todos.length === 0 && <div className="my-2">Enter Your Todo</div>}

            {todos.map(item=>{
              return (showFinished || !item.isCompleted) && <div className="hero" key={item.id}>

           <div className="finished_todo">
          <div className="checkboxes">
            <input type="checkbox" className="chbox" onChange={handleCheckbox} name={item.id} value={item.isCompleted} /> 
            {/* <div className="content">{item.todo}</div> */}
            {/* <div className= {item.isCompleted?"line-through":""}>{item.todo}</div> */}
            <div className="content" style={{ textDecoration: !item.isCompleted ? 'line-through' : 'inherit' }}>{item.todo}</div>

           </div>  
            <div className="edit">
              <button className="btn btns" onClick={(e)=>{handleEdit(e,item.id)}}><FaEdit /></button>
            <button className="btn btns" onClick={(e)=>{handleDelete(e,item.id)}}><MdDelete /></button>
            </div>
          </div>

         
          </div>
            })}
        </div>
      </div>
     
    </>
  );
};

export default Body;
