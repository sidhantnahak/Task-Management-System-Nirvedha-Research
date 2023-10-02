import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './home.css'
import { useDispatch, useSelector } from 'react-redux'
import Main from './Main'
import { Logout } from '../../redux/useraction'
import { useAlert } from 'react-alert'

const Home = ({ setnote,note }) => {
    const navigate = useNavigate();
    const alert=useAlert();
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.user)
    const closeMenu = (e) => {
        e.preventDefault()
        let toogle_btn_icon = document.getElementById('bar');
        let elem = document.getElementById("sidebar2")
        elem.classList.toggle("open")
        const isOpen = elem.classList.contains('open');
        toogle_btn_icon.classList = isOpen ? "fa-solid fa-bars-staggered" : "fa-solid fa-bars"
    }


    const taskHandler = () => {
        let elem = document.getElementById("tasks");
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }
useEffect(() => {
 
}, [navigate])

    return (
        <>
            <nav >
                <Link to='/' >Ambula Technologies Private Ltd
                </Link>
                <div className='username'>
                    <span style={{color:"white",fontSize:"1.2rem"}}>{user.name}</span>
                </div>
                <Link onClick={closeMenu} id='bar' className="fa-solid fa-bars" />

            </nav>

            <div id='sidebar' className='sidebar'>
                <Link to="/dashboard" onClick={() => { taskHandler(); navigate("/dashboard"); setnote("All Tasks") }}>Get All Tasks</Link>
                <Link to="/dashboard" onClick={() => setnote("To Do")}>To Do Tasks</Link>
                <Link to="/dashboard" onClick={() => setnote("Doing")}>Doing Tasks</Link>
                <Link to="/dashboard" onClick={() => setnote("Done")}>Done Tasks</Link>
                 <Link onClick={()=>{dispatch(Logout());alert.success("Logged Out Successfully!")}}> Logout <i style={{padding:"0 0 4px 8px"}} class="fa-solid fa-right-from-bracket"></i></Link>
            </div>
            <div id='sidebar2' className="sidebar2">
                <ul>
                    <li><Link to="/dashboard" onClick={() => { taskHandler(); navigate('/dashboard'); setnote("All Tasks"); }} >Get All Tasks</Link></li>
                    <li><Link to="/dashboard" onClick={() => setnote("To Do")}>To Do Tasks</Link></li>
                    <li><Link to="/dashboard" onClick={() => setnote("Doing")} >Doing Tasks</Link></li>
                    <li><Link to="/dashboard" onClick={() => setnote("Done")} >Done Tasks</Link></li>
                    <li> <Link style={{color:"black",fontWeight:"bold",fontSize:"1.3rem"}} onClick={()=>{dispatch(Logout());alert.success("Logged Out Successfully!")}}> Logout </Link><i style={{padding:"7px 0 0px 10px"}} class="fa-solid fa-right-from-bracket"></i></li>






                </ul>
            </div>
            <div className="buttom_nav_links">
                <span> {user.name}</span>
            </div>
            <Main note={note}/>
        </>
    )
}

export default Home