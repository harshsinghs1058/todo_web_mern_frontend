import "./sign_up.css";
import React from "react";
import studyGif from "./../../assets/gif/study.gif";
import studyImg from "./../../assets/images/study.png";
import { Link } from "react-router-dom";
export default function SignUpPage() {
    return <div className="sign_up_page">
        <div className="container">
        </div >
        <div className="inputForm">
            <h1 className="title">Sign Up</h1>
            <div >
                <i class="fas fa-user"></i>
                <input placeholder="Email" type="email" />
            </div>

            <div>
                <i class="fas fa-key"></i>
                <input placeholder="Password" type="password" />
            </div>

            <div>
                <i class="fas fa-check-circle"></i>
                <input placeholder="Confirm Password" type="password" />
            </div>
            <button>Sign Up</button>
            <p className="signUpWith">or sign up with social platforms</p>
            <div className="socialIcons">
                <div><i className="fab fa-facebook fa-2x"></i></div>
                <div><i className="fab fa-google fa-2x"></i></div>
                <div><i className="fab fa-linkedin-in fa-2x"></i></div>
            </div>
        </div>
        <div className="Image">
            <img src={studyGif} alt="Cool" className="gif" />
            <img src={studyImg} alt="Cool" className="staticImg" />
        </div>
        <div className="orSignIn">
            <h1>One of Us?</h1>
            <p>blog it is a platform where you can share your knowledge or the experience </p>
            <button><Link to="/sign-in">Sign In</Link></button>
        </div>
    </div >

}
