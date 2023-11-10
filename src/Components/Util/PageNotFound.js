import React from "react"
import { useNavigate } from "react-router-dom"
import '../../App.css'

export default function PageNotFound(){
  
    const navigate = useNavigate()

    const RouteHome = () => {
        navigate("/")
    }

    return (
        <div style={{backgroundColor: '#a0f2ff',  height: "100vh", overflow:"auto", display: "flex-around", alignItems: "center"}}>
            <h3 style={{color: "#000080"}}>You might be lost.</h3>
            <h5 style={{color: '#8e00de'}}>Please use the navigation bar to route our available pages.</h5>
            <button className='input_submit'  onClick={RouteHome}> Home Page Button </button>
        </div>
    )
}