import React, { Component } from "react"
import { connect } from "react-redux"
import socket from "../socket.jsx"
import config from '../config.jsx'

class Landing extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
    }

    render() {

        return (
            <div id="landing">
                {this.props.account.logged_in && <input placeholder="Message" onChange={(e) => this.updateMessage(e.target.value)}/>}
                {this.renderWall()}
            </div>
        )
    }

    renderWall() {
        return (
            <div className="wall">
                {this.renderMessages()}
            </div>
        )
    }

    renderMessages() {
        return this.props.messages.map((message, i) => this.renderMessage(message, i))
    }

    renderMessage(message, i) {
        return (
            <div key={`message-${i}`} className="message">
                <div className="name">{message.display_name}</div>
                <div className="info">{message.info}</div>
            </div>
        )
    }

    updateMessage(msg) {
        socket.emit("action", {type: config.ACTIONS.UPDATE_MESSAGE, payload: {message: msg}});
    }
}

function mapStateToProps(store) {
    return {
        account: store.account,
        messages: store.messages.live
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Landing)