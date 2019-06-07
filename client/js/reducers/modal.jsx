import Config              from "../config.jsx"

const initialState = {
    name: "",
    params: {}
}

export default function modalReducer(state = initialState, action) {

    if (action.type === Config.ACTIONS.UPDATE_MODAL) {

        if (!action.payload.params) {
            action.payload.params = {}
        }

        return {
            ...state,
            ...action.payload
        }
    } else if (action.type === Config.ACTIONS.LOGIN_SUCCESS ||
               action.type === Config.ACTIONS.REGISTER_SUCCESS) {
        return {
            ...initialState
        }
    }

    return state
}