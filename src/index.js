import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ErrorPage from "./Components/error_page/error_page";
import HomePage from "./Components/home_page/home_page";
import SignInPage from "./Components/sign_in_page/sign_in_page";
import SignUpPage from "./Components/sign_up_page/sign_up_page";
import "./global.css";
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={HomePage}></Route>
                <Route exact path='/sign-in' component={SignInPage}></Route>
                <Route exact path='/sign-up' component={SignUpPage}></Route>
                <Route path='/' component={ErrorPage}></Route>
            </Switch>
        </Router>
    )
}
ReactDOM.render(<App />, document.getElementById("root"));