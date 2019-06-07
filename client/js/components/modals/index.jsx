import React, { Component } from "react"
import { connect }               from "react-redux"

import Config               from "../../config.jsx"
import Register             from "./register.jsx"
import Login             from "./login.jsx"

class Modals extends Component {

    render() {

        // Don't scroll the body
        if(this.props.modal.name){
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "scroll"
        }

        return (
            <div>
                {this.props.modal.name === Config.MODALS.REGISTER && <Register />}
                {this.props.modal.name === Config.MODALS.LOGIN && <Login />}
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        modal: store.modal,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Modals)