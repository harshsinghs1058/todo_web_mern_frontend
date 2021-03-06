import "./sign_up.css";
import React, { useState } from "react";
import studyGif from "./../../assets/gif/study.gif";
import studyImg from "./../../assets/images/study.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth } from "../../context/auth_context";
import loading_gif from "./../../assets/gif/loading_gif.gif";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};
const validate = (values) => {
  let errors = {};
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!re.test(values.email)) {
    errors.email = "Invalid email";
  }

  //password validation
  if (values.password.length < 8) {
    errors.password = "Min length is 8";
  }
  //confirm password validation
  if (values.confirmPassword.length < 8) {
    errors.confirmPassword = "Min length is 8";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "MisMatch Password";
  }

  return errors;
};
export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({ initialValues, validate });
  const [allEdited, setAllEdited] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [auth, userSignIn, userSignOut] = useAuth(useAuth);
  const navigate = useNavigate();

  //sign up form submission handler
  const handleFormSubmission = async (event) => {
    event.preventDefault();
    setAllEdited(true);
    if (
      !(
        formik.errors.email ||
        formik.errors.password ||
        formik.errors.confirmPassword
      )
    ) {
      setIsLoading(true);
      try {
        const res = await axios.post(
          process.env.REACT_APP_URL + "user/signUp",
          formik.values
        );

        if (res.status === 201) {
          //on sign up successfully
          localStorage.setItem(
            "authTodo",
            JSON.stringify({
              isSignedIn: true,
              email: formik.values.email,
            })
          );
          userSignIn(formik.values.email);
          navigate(`/${formik.values.email}/Todos`);
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        if (err.response) alert(err.response.data.message);
        else alert(err);
      }
      setIsLoading(false);
    }
  };

  //jsx
  return (
    <div className='sign_up_page'>
      <div className='container'></div>
      <form className='inputForm' onSubmit={handleFormSubmission}>
        <h1 className='title'>Sign Up</h1>
        <div>
          <i className='fas fa-user'></i>
          <input
            placeholder='Email'
            type='name'
            name='email'
            formNoValidate
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            autoFocus
          />
          {formik.touched.email && (
            <div className='error'>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <i className='fas fa-key'></i>
          <input
            placeholder='Password'
            type='password'
            name='password'
            formNoValidate
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {(allEdited || formik.touched.password) && formik.errors.password && (
            <div className='error'>{formik.errors.password}</div>
          )}
        </div>

        <div>
          <i className='fas fa-check-circle'></i>
          <input
            placeholder='Confirm Password'
            type='password'
            name='confirmPassword'
            formNoValidate
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {(allEdited || formik.touched.confirmPassword) && (
            <div className='error'>{formik.errors.confirmPassword}</div>
          )}
        </div>
        {isLoading ? (
          <img src={loading_gif} className='loading_gif' alt='loading' />
        ) : (
          <button>Sign Up</button>
        )}
        <p className='signUpWith'>or sign up with social platforms</p>
        <div className='socialIcons'>
          <div>
            <i className='fab fa-facebook fa-2x'></i>
          </div>
          <div>
            <i className='fab fa-google fa-2x'></i>
          </div>
          <div>
            <i className='fab fa-linkedin-in fa-2x'></i>
          </div>
        </div>
      </form>
      <div className='Image'>
        <img src={studyGif} alt='Cool' className='gif' />
        <img src={studyImg} alt='Cool' className='staticImg' />
      </div>
      <div className='orSignIn'>
        <h1>One of Us?</h1>
        <p>
          blog it is a platform where you can share your knowledge or the
          experience{" "}
        </p>
        <button>
          <Link to='/sign-in'>Sign In</Link>
        </button>
      </div>
    </div>
  );
}
