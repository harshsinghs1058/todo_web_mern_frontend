import React from "react";
import { Link } from "react-router-dom";
function ErrorPage() {
    return (
        <div>
            <h1>Error 404</h1>
            <h3>Page Not Found</h3>
            <br />
            <h3>Go To Home Page<button><Link to="/">Home Page</Link></button></h3>
        </div>
    )
}

export default ErrorPage;