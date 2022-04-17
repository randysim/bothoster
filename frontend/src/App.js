import './App.css';
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home.js"
import Login from "./pages/login.js"
import SignUp from "./pages/signup.js"
import BotPage from './pages/botpage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/botpage" element={<BotPage />} />
        </Routes>
      </Router>
    )
  }
}

export default App;
