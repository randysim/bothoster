import React from "react"
import { Navigate } from "react-router-dom"

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: ""
        }
    }

    redirect = () => {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
    }

    render() {
        return (
            <div id="homePage">
                {this.redirect()}
                <div id="homeTitle">BotHoster</div>
                <div id="homeBtnCont">
                    <button id="login" className="homePageBtn" onClick={() => { this.setState({ redirect: "/login" }) }}>Login</button>
                    <button id="signup" className="homePageBtn" onClick={() => { this.setState({ redirect: "/signup" }) }}>Sign Up</button>
                </div>
            </div>
        )

    }
}