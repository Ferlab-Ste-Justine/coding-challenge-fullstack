/**
 * 
 *  Local Storage's only functionality is to keep state when the user refreshes, leaves etc.
 * 
 *  React components should NOT get or listen to changes on this storage and should not use it as a Redux store.
 *  Action creators and thunks will change the current store and change the local storage for persistence.
 * 
 */


// JWT Structure
// {
//     $address: $token,
//     ...
// }

export function setJWT(token) {
    if (typeof Storage !== 'undefined') {
        localStorage.setItem('token', token)
    }
}

export function getJWT() {
    if (typeof Storage !== 'undefined') {
        return localStorage.getItem('token')
    }
}