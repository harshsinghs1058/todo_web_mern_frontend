import React from 'react';
import { Link } from 'react-router-dom';
import studyGif from "../../assets/gif/study.gif";
import studyImg from "../../assets/images/study.png";
import "./sign_in.css";
function SignInPage() {
    return (
        <div className="sign_in_page">
            <div className="container">
            </div >
            <div className="inputForm">
                <h1 className="title">Sign In</h1>
                <div >
                    <i class="fas fa-user"></i>
                    <input placeholder="Email" type="email" />
                </div>

                <div>
                    <i class="fas fa-key"></i>
                    <input placeholder="Password" type="password" />
                </div>
                <button>Sign In</button>
                <p className="signUpWith">or sign In with social platforms</p>
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
            <div className="or_sign_up">
                <h1>New here?</h1>
                <p>blog it is a platform where you can share your knowledge or the experience </p>
                <button><Link to="/sign-up">Sign up</Link></button>
            </div>
        </div >
    )
}

export default SignInPage;
