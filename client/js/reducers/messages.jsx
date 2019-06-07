'use strict';

import Config from "../config";

const initial_state = {
    live: []
}

export default function messagesReducer(state = initial_state, action) {

    if (action.type === Config.ACTIONS.UPDATE_MESSAGE) {
        let display_name = action.payload.display_name
        let message = action.payload.message

        let new_message = {
            display_name: display_name,
            info: message
        }

        let live_copy = state.live.slice()

        let message_index = live_copy.findIndex(message => message.display_name === display_name)

        if (message_index >= 0) {
            live_copy[message_index] = new_message
        } else {
            live_copy.push(new_message)
        }

        return {
            ...state,
            live: live_copy
        }
    } else if (action.type === Config.ACTIONS.INITIAL_MESSAGES) {
        return {
            ...state,
            live: action.payload.messages
        }
    }

    return state;
}