import {Link, useNavigate} from "react-router-dom"
import React from 'react'
import logo from '../../Images/logo.svg'
import my_basket from '../../Images/my_basket.svg'
import '../../App.css'

export default function Navbar(){
    const navigate = useNavigate()

    const goToBasket = () => {
        navigate("/p")
    }

    const goToHome = () => {
        navigate("/shop")
    }
    
    return(
        <div className="navbar">
            <div className="logo">
                <img style={{ width: "100px", height: "100px"}}  onClick={goToHome}  src={logo} alt="Logo"/>
            </div>
            <div className="navbar-sub"  style={{flexGrow:1}}>
                <button className="navbar-element" onClick={goToBasket}>
                    <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                        <Link className="link" to="/">My Basket</Link>
                        <img  style={{ width: "70px", height: "70px"}}  src={my_basket} alt="my basket"/>
                    </div>
                </button>
            </div>    
        </div>
    )
}