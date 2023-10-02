import React, { memo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { delete_task, get_task, update_task } from '../../redux/taskAction'
import { useDispatch, useSelector } from 'react-redux'

const TaskCard = ({ details }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editdata, seteditdata] = useState({ etitle: "", edescription: "", estatus: "" });

    const { task } = useSelector(state => state.taskdetail)
    const {  isUpdated } = useSelector(state => state.task);
    const onchangeHandler2 = (e) => {
        seteditdata({ ...editdata, [e.target.name]: e.target.value })
    }
    const editHandler = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
   
        if (task) {
            seteditdata({ etitle: task.title, edescription: task.description, estatus: task.status })
        }
    }, [dispatch, task, isUpdated])

    return (
        <>
            <div className="card shadow-lg" style={{ width: "21rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{details.title}</h5>
                    <p className="card-text">{details.description.length > 25 ? <>{details.description.substr(0, 25)} <span onClick={() => dispatch(get_task(details._id))} type='button' style={{ color: "blue", fontWeight: "600" }} data-toggle="modal" data-target="#exampleModalCenter"> more....</span></> : details.description} </p>

                    <Link onClick={() => { navigate("task/id"); dispatch(get_task(details._id)) }} type='button' style={{ marginRight: "1rem" }} href="#" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa-solid fa-eye"></i></Link>
                    <Link onClick={() => dispatch(get_task(details._id))} style={{ marginRight: "1rem" }} className='btn btn-primary' data-toggle="modal" data-target="#exampleModalLong"><i className="fa-solid fa-pen-to-square"></i></Link>

                    <Link onClick={() => dispatch(delete_task(details._id))} className="btn btn-primary">Delete Task</Link>
                </div>
            </div>


            {/*update*/}

            <div className="modal fade" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form style={{ width: "100%", padding: "1rem 2rem", margin: "auto", fontSize: "1.1rem", fontWeight: "700", color: "rgb(67, 52, 52)" }} onSubmit={editHandler}>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Title</label>
                                    <input type="text" name="etitle" className="form-control" defaultValue={editdata.etitle} id="exampleFormControlInput1" onChange={onchangeHandler2} required />

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Description</label>
                                    <textarea type='text' name='edescription' defaultValue={editdata.edescription} className="form-control" id="exampleFormControtextarea" rows={3} onChange={onchangeHandler2} required></textarea>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "4rem" }} name="estatus" className="check_box" >
                                    <div className='form_check_div' style={{ display: "flex", gap: "1.5rem" }} >
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={(e) => seteditdata({ ...editdata, estatus: e.target.value })} checked={editdata.estatus === "To Do"} value="To Do" id="flexRadioDefault4" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault4">
                                                To Do
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" onChange={(e) => seteditdata({ ...editdata, estatus: e.target.value })} name="flexRadioDefault" value="Doing" checked={editdata.estatus === "Doing"} id="flexRadioDefault5" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault5">
                                                Doing
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" onChange={(e) => seteditdata({ ...editdata, estatus: e.target.value })} name="flexRadioDefault" value="Done" checked={editdata.estatus === "Done"} id="flexRadioDefault6" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault6">
                                                Done
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-dismiss="modal" className="btn btn-secondary" >Close</button>
                            <button onClick={() => { dispatch(update_task(task._id, editdata)) }} data-dismiss="modal" type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* view details */}

            <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{task && task.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{task && task.description}</p>

                        </div>
                        <p style={{ margin: "0.2rem 0.5rem 1rem 1rem" }}><b>Status : </b>{task && task.status}</p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default memo(TaskCard) 