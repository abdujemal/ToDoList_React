import React, { useState } from 'react'
import { useGlobalContext } from './context'
import ToDoItem from './todo_item'
import axios from 'axios'

function App() {
  const {
    dataChanged,
    setDataChanged, 
    loading, 
    todos, 
    showModal, 
    setShowModal, 
    isEditing, 
    setIsEditing, 
    displayTodo,
    setDisplayTodo} = useGlobalContext()
  
  const [inputs, setInputs] = useState({ 
    title: "",
    description: "",
    date: "",
    time: ""});

  const [submit, setSubmit] = useState("Submit")

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
    setDisplayTodo(values => ({...values, [name]: value}))
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    setSubmit("Loading...")
    if(!isEditing){
      fetch('http://localhost:5000/api/v1/todos',{
        method: 'POST',
        body:  JSON.stringify(inputs),
        headers:{
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((res)=>{
        setSubmit("Submit")
        setShowModal(false)
        setInputs({})
        setDataChanged(!dataChanged)
      })
    }else{
      // const keys = inputs.key
      // const values = inputs.values
      // keys.map((key)=>{
      //   setDisplayTodo(values => ({...values, }))
      // })
      
      fetch(`http://localhost:5000/api/v1/todos/${displayTodo.id}`,{
        method: 'PATCH',
        body:  JSON.stringify(displayTodo),
        headers:{
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((res)=>{
        setSubmit("Submit")
        setShowModal(false)
        setInputs({})
        setDataChanged(!dataChanged)
      })
    }
  }
 

  if(loading){
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }
  

  return (
    <main>
      
        <div className="title">
            <h1>To Do List</h1> 
        </div>
          
        <div className="to-do-list">
          {
            todos.map((todo)=><ToDoItem todo={todo}/>)

          }
           {/* <ToDoItem todo={{title: "Do Project",desc:"exercise my react and node projects",date: "2021-11-04", time: "04:32"}}/> */}
        </div>
        <div className="add-to-do" onClick={()=>{setShowModal(true)}}><i className="fas fa-plus"></i></div>
        <div className={showModal ? "add-to-do-modal show-modal" : "add-to-do-modal"}>
            <div className="add-to-do-modal-content">
                <h1>{isEditing ? "Edit To-do" : "Add To-Do"}</h1>
                <button className="remove-modal" onClick={()=>{setShowModal(false);setIsEditing(false)}}><i className="fas fa-times"></i></button>
                <form onSubmit={handleSubmit}>
                  <input onChange={handleChange} type="text" name="title" id="title" value={ inputs.title || displayTodo.title } placeholder="title"/>
                  <input onChange={handleChange} type="text" name="description" id="description" value={inputs.description || displayTodo.description} placeholder="Description"/>
                  <div className="date">
                    <label for="date">Date</label>
                    <input onChange={handleChange} type="date" name="date" value={inputs.date || displayTodo.date} id="date-time" min="2020-01-01" max="2050-12-31"/>
                  </div>
                  <div className="time">
                    <label for="time">Time</label>
                    <input onChange={handleChange} type="time" name="time" value={inputs.time || displayTodo.time} id="date-time"/>
                  </div>
                  <input type="submit" className="submit" value={submit}/>
                </form> 
            </div>
        </div>
      
    </main>
  )
}

export default App
