import axios from "axios";
import { getuser_fail, getuser_request, getuser_sucess, login_fail, login_request, login_sucess, logout_fail, logout_request, logout_sucess, register_fail, register_request, register_sucess } from "./taskConstants";



axios.create({
    // baseURL:"http://localhost:4000",
    withCredentials:true
    
  })
  const backend_url = "https://nirvedha-research-task-management-system.onrender.com"

  
export const register = (data) => async (dispatch) => {
    const {name,email,phone,password}=data;
    try {

        dispatch({ type: register_request });
        const config = { headers: {"Content-Type": "application/json"}};
        const { data } = await axios.post(`${backend_url}/api/v1/signup`,
            {name, email,phone, password},config
        );

        dispatch({ type: register_sucess, payload: data.user });

    } catch (error) {
       
        dispatch({ type: register_fail, payload: error.response.data.message })

    }
}

export const login = (data) => async (dispatch) => {
    const {email,password}=data;

    try {

        dispatch({ type: login_request });
        const config = { headers: {"Content-Type": "application/json"}};
        const { data } = await axios.post(`${backend_url}/api/v1/login`,
            { email, password },
            config
        );



        dispatch({ type: login_sucess, payload: data.user });

    } catch (error) {
        dispatch({ type: login_fail, payload: error.response.data.message })

    }

}


export const Logout=()=>async(dispatch)=>{
    try {
        dispatch({ type: logout_request });
        
        const { data } = await axios.get(`${backend_url}/api/v1/logout`)
        dispatch({ type: logout_sucess,payload:data.sucess});
       

    } catch (error) {
        dispatch({ type: logout_fail,payload:error.response.data.message });
        
    }

}

export const getUser=()=>async(dispatch)=>{
    try {
        dispatch({ type: getuser_request });

        
        const { data } = await axios.post(`${backend_url}/api/v1/me`)
        dispatch({ type: getuser_sucess,payload:data.user});
       

    } catch (error) {
        dispatch({ type: getuser_fail,payload:error.response.data.message });
        
    }
}