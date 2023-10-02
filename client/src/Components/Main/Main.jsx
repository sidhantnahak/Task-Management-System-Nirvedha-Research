import React, { memo, useEffect, useRef, useState } from 'react'
import './main.css'
import TaskCard from './TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Clear_Errors, getall_task, register_task } from '../../redux/taskAction'
import { delete_task_reset, register_task_reset, update_task_reset } from '../../redux/taskConstants'
import Loader from '../Loader&Notfound/Loader'
// import AddTaskButton from './AddTaskButton'

const Main = ({ note }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const ref = useRef();

    const [data, setdata] = useState({ title: "", description: "", status: "To Do" });
    const { sucess, error, isDeleted, isUpdated } = useSelector(state => state.task);
    const { tasks,loading } = useSelector(state => state.tasks);

    const onchangeHandler = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    const formHandler = (e) => {
        e.preventDefault()
        dispatch(register_task(data))

    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(Clear_Errors())
        }
        if (sucess) {
            setdata({ title: "", status: "To Do", description: "" })
            alert.success("Task added sucessfully")
            dispatch(getall_task())
            dispatch({ type: register_task_reset })
        }

        if (isDeleted) {
            alert.success("Task Deleted Sucessfully!")
            dispatch(getall_task())
            dispatch({ type: delete_task_reset })

        }
        if (isUpdated) {
            alert.success("Task Updated Sucessfully!")
            dispatch(getall_task())
            dispatch({ type: update_task_reset })

        }
    }, [dispatch, error, sucess, alert, isDeleted, isUpdated, data])
    return (
        <div className='main_container'>


            <form style={{ width: "100%", boxShadow: "1px 1px 3px black", padding: "1rem 2rem", margin: "auto", fontSize: "1.1rem", fontWeight: "700", color: "rgb(67, 52, 52)" }} onSubmit={formHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Title</label>
                    <input ref={ref} type="text" name="title" className="form-control" id="exampleFormControlInput1" value={data.title} onChange={onchangeHandler} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Description</label>
                    <textarea type='text' name='description' className="form-control" value={data.description} id="exampleFormControtextarea" rows={3} onChange={onchangeHandler} required></textarea>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4rem" }} name="status" className="check_box" >
                    <input type="submit" value="Add Task" className='btn btn-primary' />
                    <div className='form_check_div' style={{ display: "flex", gap: "1.5rem" }}>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" value="To Do" onChange={(e) => setdata({ ...data, status: e.target.value })} checked={data.status === "To Do"} id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                To Do
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" value="Doing" onChange={(e) => setdata({ ...data, status: e.target.value })} checked={data.status === "Doing"} id="flexRadioDefault2" />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Doing
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" value="Done" onChange={(e) => setdata({ ...data, status: e.target.value })} checked={data.status === "Done"} id="flexRadioDefault3" />
                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                Done
                            </label>
                        </div>
                    </div>
                </div>
            </form>

            <div className="status_div">
                <div style={{ background: `linear-gradient( #340537, #781145, #b63741, #df702e, #ebb212)` }}>Total Tasks : {(tasks && tasks.length) ?? 0}</div>
                <div style={{ background: ` linear-gradient(to right bottom, #1e0537, #4a0d53, #7d0e69, #b40c77, #eb127e)` }}>To Do : {(tasks && tasks.filter(e => e.status === "To Do").length) ?? 0} </div>
                <div style={{ background: "linear-gradient( #340537, #781145, #b63741, #df702e, #ebb212)" }}>Doing : {(tasks && tasks.filter(e => e.status === "Doing").length) ?? 0}</div>
                <div style={{ background: `linear-gradient(to right bottom, #050537, #391456, #72166e, #af117c, #eb127e)` }}>Done : {(tasks && tasks.filter(e => e.status === "Done").length) ?? 0}</div>
            </div>


            {loading ? <Loader /> :
                <> {note === "All Tasks" ? <h3 style={{ textAlign: "center" }}>All Tasks</h3> : <h3 style={{ textAlign: "center" }}>{note} Tasks</h3>}
                    <div id='tasks' className="notes_container">
                        {note === "All Tasks" &&

                            tasks && tasks.map(e => {
                                return <TaskCard key={e._id} details={e} />
                            })}

                        {note === "To Do" && <h1>To Do Tasks</h1> &&
                            tasks && tasks.filter(e => e.status === "To Do").map(e => {
                                return <TaskCard key={e._id} details={e} />
                            })}

                        {note === "Doing" && <h1>Doing Tasks</h1> &&
                            tasks && tasks.filter(e => e.status === "Doing").map(e => {
                                return <TaskCard key={e._id} details={e} />
                            })}

                        {note === "Done" && <h1>Done Tasks</h1> &&
                            tasks && tasks.filter(e => e.status === "Done").map(e => {
                                return <TaskCard key={e._id} details={e} />
                            })}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                        {note==="All Tasks" && (!tasks || tasks.length===0 ) && <button onClick={() => ref.current.focus()} className='btn btn-primary'>Add a Task</button> }

                        {note === "To Do" && (!tasks || tasks.filter(e => e.status === "To Do").length === 0 ) && <button onClick={() => ref.current.focus()} className=' btn btn-primary  '>Add a Task </button>}
                        {note === "Doing" && (!tasks || tasks.filter(e => e.status === "Doing").length === 0) && <button onClick={() => ref.current.focus()} className=' btn btn-primary  '>Add a Task </button>}
                        {note === "Done" &&(!tasks || tasks.filter(e => e.status === "Done").length === 0) && <button onClick={() => ref.current.focus()} className=' btn btn-primary  '>Add a Task </button>}
                    </div>
                </>
            }
        </div >
    )
}

export default  memo (Main)
