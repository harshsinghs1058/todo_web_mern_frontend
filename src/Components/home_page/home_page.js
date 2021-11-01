import React from "react";
import { Link } from "react-router-dom";
export default function HomePage() {
    return (
        <div>
            <h1>This is Home page still under construction</h1>
            <h3>Sign in page link</h3>
            <button>
                <Link to="sign-in">Sign In Page</Link>
            </button>
            <h3>Sign up page link</h3>
            <button>
                <Link to="sign-up">Sign Up Page</Link>

            </button>
        </div>
    )
}
