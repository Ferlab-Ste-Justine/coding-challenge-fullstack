'use strict';

import Config from "../config";

const initial_state = {
    account_id: 0,
    display_name: '',
    logged_in: false
}

export default function accountReducer(state = initial_state, action) {

    if (action.type === Config.ACTIONS.LOGIN_SUCCESS || action.type === Config.ACTIONS.GET_ACCOUNT_SUCCESS || action.type === Config.ACTIONS.REGISTER_SUCCESS) {

        let account = action.payload.account

        return {
            ...state,
            account_id: account.account_id,
            display_name: account.display_name,
            logged_in: true
        }
    }

    return state;
}