import { clear_errors, delete_task_fail, delete_task_request, delete_task_reset, delete_task_sucess, getalltask_fail, getalltask_request, getalltask_sucess, gettask_fail, gettask_request, gettask_sucess, register_task_fail, register_task_request, register_task_reset, register_task_sucess, update_task_fail, update_task_request, update_task_reset, update_task_sucess } from "./taskConstants";


export const taskReducer = (state = { task: {} }, action) => {

    switch (action.type) {
        case register_task_request:
        case delete_task_request:
        case update_task_request:
            return {
                loading: true,
            }

        case register_task_sucess:

            return {
                ...state,
                loading: false,
                sucess: action.payload

            }
        case update_task_sucess:
            return {
                ...state,
                loading: false,
                isUpdated: true
            }
        case delete_task_sucess:
            return {
                ...state,
                loading: false,
                isDeleted: true
            }
        case register_task_fail:
        case delete_task_fail:
        case update_task_fail:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case register_task_reset:
        case delete_task_reset:
        case update_task_reset:

            return {
                ...state,
                sucess: false,
                isDeleted: false,
                isUpdated: false
            }
        case clear_errors:
            return {
                ...state,
                error: null
            }
        default:
            return {
                ...state,
                error: null,
            }
    }

}


export const taskdetail = (state = { task: {} }, action) => {

    switch (action.type) {
        case gettask_request:
            return {
                loading: true,
            }

        case gettask_sucess:
            return {
                ...state,
                loading: false,
                task: action.payload
            }
        case gettask_fail:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        case clear_errors:
            return {
                ...state,
                error: null
            }
        default:
            return {
                ...state,
                error: null,

            }

    }


}

export const alltasks = (state = { alltask: {} }, action) => {

    switch (action.type) {
        case getalltask_request:
            return {
                ...state,
                loading: true
            }

        case getalltask_sucess:
            return {
                ...state,
                loading: false,
                tasks: action.payload
            }
        case getalltask_fail:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case clear_errors:
            return {
                ...state,
                error: null,

            }
        default:
            return {
                ...state,
                error: null,

            }
    }


}

