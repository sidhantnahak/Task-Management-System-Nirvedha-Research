import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import { useState, useEffect } from 'react'
import { clearErrors, login } from '../../redux/useraction';
import { useDispatch, useSelector } from 'react-redux'

import { useAlert } from 'react-alert';
import { login_reset } from '../../redux/taskConstants';
import Loader from '../Loader&Notfound/Loader';
import { Clear_Errors, getall_task } from '../../redux/taskAction';
import Loder2 from '../Loader&Notfound/Loder2';


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert()


    const { user, loading, isAuthenticated, error, sucess } = useSelector((state) => state.user);


    const [data, setData] = useState({ email: "", password: "" })

    function Onchange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const OnSubmit = (e) => {

        e.preventDefault()
        dispatch(login(data))
    }


    useEffect(() => {
        if (error) {
            alert.error(error)

            dispatch(Clear_Errors())
        }
        if (sucess && isAuthenticated) {
            alert.success("Logged in sucessfully")

            navigate("/dashboard");
            dispatch(getall_task())
            dispatch({ type: login_reset })

        }
        if(isAuthenticated){
            navigate("/dashboard")
        }



    }, [dispatch, navigate, isAuthenticated, loading, error, user, alert, sucess])
    return (
        <>
{loading?<Loder2/>:

           
            <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",width:"100%",padding:"0 2rem"}}>

            
                <form style={{padding:"0 2rem", boxShadow: "1px 1px 3px black", padding: "1rem 2rem", margin: "auto", fontSize: "1.1rem", fontWeight: "700", color: "rgb(67, 52, 52)" }} onSubmit={OnSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Your Email</label>
                    <input  type="email" name="email" className="form-control" id="exampleFormControlInput1"  onChange={Onchange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Your Password</label>
                    <input type='password' name='password' className="form-control"  id="exampleFormControtextarea"  onChange={Onchange} required></input>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4rem" }} name="status" className="check_box" >
                    <input type="submit" value="Login" className='btn btn-primary ' /> <span> <Link style={{textDecoration:"none"}} to="/signup"> Create a new account</Link></span>
                </div>
            </form>
            </div>
}
        </>
    )
}

export default Login