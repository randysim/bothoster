import * as Axios from "axios"
import React from "react";
import Session from "../sessionManager";
import { Navigate } from "react-router-dom"

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: "",
            error: ""
        }
    }

    signup = () => {
        Axios.post("api/createaccount", { username: this.state.username, password: this.state.password })
            .then(res => {
                if (!res.data.success) return this.setState({ error: res.data.error })

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
                <div id="loginCont">
                    {this.redirect()}
                    <h1>Sign Up</h1>
                    <div className="break" />
                    <input className="accInput" onChange={(e) => { this.setState({ username: e.target.value }) }} value={this.state.username} placeholder="username" />
                    <div className="break" />
                    <input className="accInput" onChange={(e) => { this.setState({ password: e.target.value }) }} value={this.state.password} placeholder="password" />
                    <div className="break" />
                    <button className="homePageBtn" onClick={this.signup}>Sign Up</button>
                    <div className="break" />
                    <div className="error">{this.state.error}</div>
                </div>
            </div>
        )
    }
}