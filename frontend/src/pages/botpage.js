import React from "react";
import * as Axios from "axios";
import Session from "../sessionManager";
import { Navigate } from "react-router-dom"

export default class BotPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: "",
            botData: [],
            loading: true,
            botName: "",
            fileSelect: undefined,
            error: "",
            page: "default"
        }
    }

    componentDidMount = () => {
        let clientSess = Session.getData()
        if (!clientSess.username || !clientSess.token) {
            return this.setState({ redirect: "/" })
        }

        Axios.post("api/getuserbots", { username: clientSess.username, token: clientSess.token })
            .then(res => {
                if (!res.data.success) {
                    return this.setState({ redirect: "/" })
                }

                this.setState({ loading: false, botData: res.data.botData })
            });

    }

    redirect = () => {
        if (this.state.redirect) return <Navigate to={this.state.redirect} />
    }

    renderBots = () => {
        let bots = [];

        // push divs in here
        this.state.botData.forEach(bot => {
            bots.push(<div className="botData" style={{ color: bot.running ? "green" : "red" }}>{bot.name + (bot.running ? " - running" : " - offline")}</div>)
        })

        return bots;
    }

    renderLoad = () => {
        return <div id="loadingPage">Loading...</div>
    }

    renderCreatePage = () => {
        /* 
            let indexFile = req.body.index;
            let authToken = req.body.token;
            let username = req.body.username;
            let botName = req.body.name;
        */
        let createBot = () => {
            // read index file first
            const reader = new FileReader()
            reader.onload = e => {

                let code = e.target.result;
                console.log(code)
                let clientSess = Session.getData()
                Axios.post("api/createbot", { index: code, token: clientSess.token, username: clientSess.username, botName: this.state.botName })
                    .then(res => {
                        console.log(res.data)
                        if (!res.data.success) {
                            return this.setState({ error: res.data.error })
                        }

                        this.setState({ botData: [...this.state.botData, { name: this.state.botName, running: res.data.status }], botName: "", fileSelect: undefined, error: "", page: "default" })
                    })
            }
            reader.readAsText(this.state.fileSelect)

        }

        return (
            <div id="createPage">
                <div id="loginCont">
                    <h1>Bot Creation</h1>
                    <div className="break" />
                    <input className="accInput" value={this.state.botName} onChange={e => this.setState({ botName: e.target.value })} placeholder="bot name" />
                    <div className="break" />
                    <input onChange={(e) => this.setState({ fileSelect: e.target.files[0] })} type="file" name="file" />
                    <div className="break" />
                    <button className="homePageBtn" onClick={createBot}>Create Bot!</button>
                    <div className="break" />
                    <div>{this.state.error}</div>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.redirect) return this.redirect()
        if (this.state.loading) return this.renderLoad()

        if (this.state.page == "create") {
            return this.renderCreatePage()
        } else {
            return (
                <div id="botPage">
                    <div id="botControls">
                        <button className="homePageBtn" onClick={() => this.setState({ page: "create" })}>Create Bot</button>
                    </div>
                    <div id="botCont">
                        <h1>Your Bots:</h1>
                        {this.renderBots()}
                    </div>
                </div>
            )
        }
    }
}