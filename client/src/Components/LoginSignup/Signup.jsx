import { React, useState, useEffect, useRef } from 'react'
import './signup.css'
import { useDispatch, useSelector } from 'react-redux'
import {  register } from '../../redux/useraction'
import { useNavigate, Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { register_reset } from '../../redux/taskConstants'
import { Clear_Errors } from '../../redux/taskAction'
import Loder2 from '../Loader&Notfound/Loder2'


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert()

  const [data, setData] = useState({ name: "", email: "", password: "", phone: null })
  const { isAuthenticated, error, loading, sucess } = useSelector((state) => state.user);

  const Onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }
  const onsubmit = (e) => {
    e.preventDefault()
    dispatch(register(data))
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(Clear_Errors())
    }
    if (sucess) {
      alert.success("Sucessfully registered")
      navigate('/dashboard');
      dispatch({ type: register_reset })
    }
    if(isAuthenticated){
      navigate("/dashboard")
    }

  }, [dispatch, isAuthenticated, navigate, error, alert, sucess])


  return (
    <>
     {loading?<Loder2/>:
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding:"0 2rem"}}>


          <form style={{  boxShadow: "1px 1px 3px black", padding: "1rem 2rem", margin: "auto", fontSize: "1.1rem", fontWeight: "700", color: "rgb(67, 52, 52)" }} onSubmit={onsubmit}>
          <div className="mb-1">
              <label htmlFor="exampleFormControlInput1" className="form-label">Enter Your Name</label>
              <input type="text" name="name" className="form-control" id="exampleFormControlInput1" onChange={Onchange} required />
            </div>
            <div className="mb-1">
              <label htmlFor="exampleFormControlInput1" className="form-label">Enter Your Email</label>
              <input type="email" name="email" className="form-control" id="exampleFormControlInput2" onChange={Onchange} required />
            </div>
            
            <div className="mb-1">
              <label htmlFor="exampleFormControlInput1" className="form-label">Enter Your Phone Number</label>
              <input type="number" name="phone" className="form-control" id="exampleFormControlInput3" onChange={Onchange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Your Password</label>
              <input type='password' name='password' className="form-control" id="exampleFormControtextarea" onChange={Onchange} required></input>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4rem" }} name="status" className="check_box" >
              <input type="submit" value="Signup" className='btn btn-primary' /><span> <Link style={{textDecoration:"none"}} to="/login"> Already have an account</Link></span>
            </div>
          </form>
        </div>
}
      
    </>
  )
}

export default Signup