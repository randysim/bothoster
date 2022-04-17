import React from "react";
import * as Axios from "axios"
import Session from "../sessionManager";
import { Navigate } from "react-router-dom"

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: "",
            error: ""
        }
    }

    login = () => {
        Axios.post("api/login", { username: this.state.username, password: this.state.password })
            .then(res => {
                if (!res.data.success) {
                    this.setState({ error: res.data.error })
                    return;
                }

                let clientSess = Session.getData()
                clientSess.username = this.state.username;
                clientSess.token = res.data.token;
                Session.setData(clientSess)
                this.setState({ redirect: "/botpage" })
            })
    }

    redirect = () => {
        if (this.state.redirect) return <Navigate to={this.state.redirect} />
    }

    render() {
        return (
            <div id="loginPage">
                {this.redirect()}
                <div id="loginCont">
                    <h1>Login</h1>
                    <div className="break" />
                    <input className="accInput" onChange={(e) => { this.setState({ username: e.target.value }) }} value={this.state.username} placeholder="username" />
                    <div className="break" />
                    <input className="accInput" onChange={(e) => { this.setState({ password: e.target.value }) }} value={this.state.password} placeholder="password" />
                    <div className="break" />
                    <button className="homePageBtn" onClick={this.login}>Login</button>
                    <div className="break" />
                    <div className="error">{this.state.error}</div>
                </div>

            </div>
        )
    }
}