import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create=()=>{
    const [todo, setTodo] = useState({activity:""})
    const navigate = useNavigate();
    const submithandler=()=>{
        const token = window.localStorage.getItem('token')
        const config={
            headers:{
                authorization:token   
            }
        }
        axios.post("https://todo-app-f9m2.onrender.com/todo",todo, config).then((res)=>{
            if(res.status === 200){
                alert("todo activity updated");
                navigate("/todo")
            }
        })
    }
    return(
        <div style={{"textAlign":"center","margin":"50px auto 0",height:"100px",width:"300px",border:"2px solid black",background:"skyblue","border-radius":"10px"}}>
        <input style={{"height":"20px","width":"200px",margin:"10px auto 0"}} type="text" onChange={(e)=>setTodo({activity:e.target.value})}/>
        <button onClick={submithandler}>Add new activity</button>
        </div>
    )
}
export default Create;