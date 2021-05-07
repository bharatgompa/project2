import React from "react"
import {AuthProvider} from "../contexts/AuthContext"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Dashboard from "./Profile"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Register from "./Register"
import Landing from "./Landing"


function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                        <PrivateRoute path="/dashboard" component={Dashboard}/>
                        <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/forgot-password" component={ForgotPassword}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default App
