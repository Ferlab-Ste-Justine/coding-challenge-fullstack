import React, { Component } from "react"
import { connect }          from "react-redux"
import Modal                from "react-modal"

import Config from "../../config.jsx"
import { closeModal }       from "../../actions/modal.jsx"
import { login } from '../../actions/account.jsx';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
    }

    render() {
        return <Modal 
            isOpen         = { this.props.modal.name === Config.MODALS.LOGIN }
            className      = "modal-login"
            ariaHideApp    = { false }
            contentLabel   = "Login"
            onRequestClose = { () => this.props.close() }
        >
            <div id="login_modal">
                <div className="modal_header">
                    <div className="text">Login</div>
                    <img className="close" src="/static/img/delete.png" onClick={_ => this.props.close()} />
                </div>
                {this.renderForm()}
            </div>
        </Modal>
    }

    updatePassword(password) {
        this.setState({
            password: password
        })
    }

    updateUsername(username) {
        this.setState({
            username: username
        })
    }

    renderForm() {
        let r = this.props.modal.params;

        return (
            <div className="content">
                <input placeholder="Username" onChange={(e) => this.updateUsername(e.target.value)}/>
                <input placeholder="Password" type="password" onChange={(e) => this.updatePassword(e.target.value)}/>

                <button className="submit" onClick={() => this.props.login(this.state.username, this.state.password)}>Submit</button>
            </div>
        )
    }
}


function mapStateToProps(store) {
    return {
        account      : store.account,
        modal        : store.modal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        close: () => {
            dispatch(closeModal())
        },
        login: (username, password) => {
            dispatch(login(username, password))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)