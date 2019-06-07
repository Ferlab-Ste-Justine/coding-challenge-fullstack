//lube
import Config from '../config.jsx';
import { getJWT, setJWT } from '../localStorage.jsx';

export function loadAccount() {

	return async dispatch => { try {

        dispatch({
            type: Config.ACTIONS.GET_ACCOUNT_LOADING,
            payload: {}
        })

        let jwt = getJWT()

        if (!jwt) {
            dispatch({
                type: Config.ACTIONS.GET_ACCOUNT_FAIL,
                payload: {}
            });

			return;
        }

        const res = await fetch(`/api/account`, {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        
		if (!res.ok) {

            dispatch({
                type: Config.ACTIONS.GET_ACCOUNT_FAIL,
                payload: {}
            });

			return;
		}

        let res_json = await res.json();
        
		dispatch({
            type: Config.ACTIONS.GET_ACCOUNT_SUCCESS,
            payload: {
                ...res_json
            }
        });

	} catch (e) {
        console.error(e)
        dispatch({
            type: Config.ACTIONS.GET_ACCOUNT_FAIL,
            payload: {}
        });
	}}
};

export function login(username, password) {

	return async dispatch => { try {

        dispatch({
            type: Config.ACTIONS.LOGIN_LOADING,
            payload: {}
        })

        const res = await fetch(`/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        
		if (!res.ok) {

            dispatch({
                type: Config.ACTIONS.LOGIN_FAIL,
                payload: {}
            });

			return;
		}

        let res_json = await res.json();
        
        setJWT(res_json.jwt)
        location.reload()

		dispatch({
            type: Config.ACTIONS.LOGIN_SUCCESS,
            payload: {
                ...res_json
            }
        });

	} catch (e) {
        console.error(e)
        dispatch({
            type: Config.ACTIONS.LOGIN_FAIL,
            payload: {}
        });
	}}
};

export function register(username, password) {

	return async dispatch => { try {

        dispatch({
            type: Config.ACTIONS.REGISTER_LOADING,
            payload: {}
        })

        const res = await fetch(`/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        
		if (!res.ok) {

            dispatch({
                type: Config.ACTIONS.REGISTER_FAIL,
                payload: {}
            });

			return;
		}

		let res_json = await res.json();

        setJWT(res_json.jwt)
        location.reload()

		dispatch({
            type: Config.ACTIONS.REGISTER_SUCCESS,
            payload: {
                ...res_json
            }
        });

	} catch (e) {
        console.error(e)
        dispatch({
            type: Config.ACTIONS.REGISTER_FAIL,
            payload: {}
        });
	}}
};

