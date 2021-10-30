import React from "react";
import ReactDOM from "react-dom";
import SignUpPage from "./Components/sign_up_page/sign_up_page";
import "./global.css";
function App() {
    return (
        <div>
            <SignUpPage />
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById("root"));