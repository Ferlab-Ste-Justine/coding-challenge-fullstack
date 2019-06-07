import Config from "../config.jsx"

export function openModal(name, params) {
    return {
        type: Config.ACTIONS.UPDATE_MODAL,
        payload: {
            params,
            name
        }
    }
}

export function closeModal() {
    return {
        type: Config.ACTIONS.UPDATE_MODAL,
        payload: {
            name: "",
            params: {}
        }
    }
}