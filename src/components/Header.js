import React from "react";
import { Outlet } from "react-router";
import { Link, useLocation, useNavigate } from 'react-router-dom';
function Header(){
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <>
            <header className="bg-gray-900 text-white" style={{position:'sticky',top:0,zIndex:1000}}>
                <nav className="flex items-center justify-between px-8 py-4">
                    <div className="flex items-center space-x-4">
                    {!localStorage.getItem("token") && <Link to="/" className="hover:text-gray-300 transition duration-300 ease-in-out">Home</Link>}
                    {!localStorage.getItem("token") && <Link to="/aboutUs" className="hover:text-gray-300 transition duration-300 ease-in-out">About Us</Link>}
                        {localStorage.getItem("token") && <Link to="/dashboard" className="hover:text-gray-300 transition duration-300 ease-in-out">Dashboard</Link>}
                    </div>
                    <div className="flex items-center space-x-4">
                        {localStorage.getItem("token") && <img src={require('../images/cart.png')} alt="img" style={{height:'3vh',width:'100%',cursor:'pointer'}} onClick={()=>navigate('/cart')}/>}
                        {localStorage.getItem("token") && <button onClick={() => {return localStorage.removeItem("token"),navigate('/')}}>Logout</button>}
                        {!localStorage.getItem("token") && <Link to="/login" className="hover:text-gray-300 transition duration-300 ease-in-out">Login</Link>}
                    </div>
                </nav>
            </header>
            <Outlet />
        </>
        
    )
}

export default Header;
