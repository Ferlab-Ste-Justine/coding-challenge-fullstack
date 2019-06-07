import React, { Component } from "react"
import { connect } from "react-redux"
import { loadAccount } from "../actions/account.jsx";

class App extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
        this.props.loadAccount()
    }

    render() {

        return (
            <div id="app">
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        account      : store.account,
        router       : store.router,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadAccount: () => {
            dispatch(loadAccount())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)