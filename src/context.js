import React,{useContext, useEffect, useState } from "react"

const url = "http://localhost:5000/api/v1/todos"

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [displayTodo, setDisplayTodo] = useState({})
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [dataChanged,setDataChanged] = useState(false)


    const fetchTodos = async()=>{
        setLoading(true)

        try{
            const response = await fetch(url);
            const data = await response.json();
            

            // const {todos} = data
            console.log(data[0]);
            // console.log(data['todos']);

            if(data){
                setTodos(data)
            }else{
                setTodos([])
            }            
           setLoading(false)
        }catch(error){
            console.log(`error: ${error}`);
            setLoading(false)
        }

    }
    useEffect(()=>{
        fetchTodos()
    },[dataChanged])

    return (
        <AppContext.Provider
            value={{
                loading,
                todos,
                showModal, 
                setShowModal,
                isEditing, 
                setIsEditing,
                displayTodo, 
                setDisplayTodo,
                dataChanged,
                setDataChanged
            }}
        >
            {children}
        </AppContext.Provider>
        )
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}