import { clear_errors, getuser_fail, getuser_request, getuser_sucess, login_fail, login_request, login_reset, login_sucess, logout_fail, logout_request, logout_sucess, register_fail, register_request, register_reset, register_sucess, register_task_request } from "./taskConstants"

export const userReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case login_request:
        case register_request:
        case getuser_request:
        case logout_request:

            return {
                loading: true,
                isAuthenticated: false
            }
        case login_sucess:
        case register_sucess:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                sucess: true,
            }
       case getuser_sucess:
        return{
            ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
        }
        case logout_sucess:
            return {
                user: null,
                loading: false,
                isAuthenticated: false,
                logout_sucess: true
            }

        case login_reset:
        case register_reset:

            return {
                ...state,
                sucess: false
            }
        case login_fail:
        case register_fail:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case getuser_fail:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case logout_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case clear_errors:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}