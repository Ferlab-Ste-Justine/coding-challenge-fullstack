import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter as Router, connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createSocketIOMiddleware from 'redux-socket.io';
import history from './history.jsx'

import App from './components/app.jsx'

import reducers from './reducers/index.jsx'

import Modals from "./components/modals/index.jsx";
import Nav from './components/nav.jsx';
import Landing from "./components/landing.jsx";

import socket from "./socket.jsx";
const socketIOMiddleware = createSocketIOMiddleware(socket, "socket/", { eventName: "action"});

if(typeof window !== 'undefined') {

    let middlewares = applyMiddleware(thunk, routerMiddleware(history), socketIOMiddleware, createLogger())

    const store = createStore(
        connectRouter(history)(
            combineReducers({
                ...reducers,
            })
        ),
        middlewares
    )

    /** Use the location.key property as key to force a component refresh */
    function createWithNewKey(Component) {
        return (props) => <Component { ...props } key={ props.location.key }/>
    }

    ReactDOM.render(
        (
            <Provider store={store}>
                <App>
                    <Router history={history}>
                        <div>
                            <Nav />
                            <div className="main">
                                <ToastContainer />
                                <Switch>
                                    {/* "key" change hack to make sure the components are remounted when you click on the same link */}
                                    <Route exact path="/"              component={ createWithNewKey(Landing) }/>
                                </Switch>
                            </div>
                            <Modals />
                        </div>
                    </Router>
                </App>
            </Provider>
        ),
        document.getElementById('root')
    )
}