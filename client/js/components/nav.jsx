import React, { Component } from "react"
import { connect } from "react-redux"
import Config               from "../config.jsx"
import { openModal } from '../actions/modal.jsx'

class Nav extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id="nav">
                <div className="left">The Wall</div>
                { !this.props.account.logged_in && 
                    <div className="right">
                        <div className="tab" onClick={() => this.props.openModal(Config.MODALS.LOGIN)}>LOGIN</div>
                        <div className="tab" onClick={() => this.props.openModal(Config.MODALS.REGISTER)}>SIGNUP</div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        modal        : store.modal,
        account      : store.account,
        router       : store.router
    }
}

function mapDispatchToProps(dispatch) {
    return {
        openModal: (name, params) => {
            dispatch(openModal(name, params))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav)