import React from "react";
import { useGlobalContext } from "./context";
import { useState } from "react";
import axios from "axios";

function ToDoItem({todo}){

    const { 
        dataChanged,
        setDataChanged,
        setShowModal, 
        setIsEditing,
        setDisplayTodo} = useGlobalContext()

    const [loading, setLoading] = useState(false)

    const deletingItem = async(id)=>{
        setLoading(true)
        try{
            await axios.delete(`http://localhost:5000/api/v1/todos/${id}`)
            setLoading(false)
            setDataChanged(!dataChanged)
        }catch(err){
            console.log(`err:${err}`);
        }  
    }
    
    return (
        <div className="todo-item">
            <h3>{todo.title}</h3>
            <p className="desc">{todo.description}</p>
            <p className="datetime">{todo.date} at {todo.time}</p>
            <i onClick={()=>{
                setShowModal(true)
                setIsEditing(true)
                setDisplayTodo({id:todo._id, title: todo.title, description: todo.description, date: todo.date, time: todo.time})
                }} className="fas fa-pen"></i>
            <i className="fas fa-trash" onClick={()=>deletingItem(todo._id)}></i>
            {
                loading ? <p>Loading...</p> : ""
            }
        </div>
    );
}
export default ToDoItem