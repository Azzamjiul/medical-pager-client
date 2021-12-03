import React from 'react';
import { useState } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
  fullname: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
}

const Auth = () => {
  const [form, setForm] = useState(initialState)
  const [isSignup, setIsSignup] = useState(false)

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { username, password, fullName, phoneNumber, avatarURL } = form;
    const URL = 'http://localhost:8080/auth';

    var configs = {
      headers: {
        "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
        "Content-Type": "application/json",
      }
    };

    axios.post(
      `${URL}/${isSignup ? 'sign-up' : 'sign-in'}`, {
        "username": username, 
        "password": password,
        "fullName": fullName,
        "phoneNumber": phoneNumber,
        "avatarURL": avatarURL,
      },
      configs
    ).then((response) => {
      console.log(response.data)
      cookies.set("token", response.data.token)
      cookies.set("id", response.data.id)
      cookies.set("name", response.data.name)

      window.location.reload();
    }).catch((error) => {
      console.log(error)
    })
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{ isSignup ? "Sign Up" : "Sign In" }</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullname">Full Name</label>
                <input
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>              
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>              
            )}

            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatr URL"
                  onChange={handleChange}
                  required
                />
              </div>              
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>             
            )}

            <div className="auth__form-container_fields-content_button">
              <button>{ isSignup ? "Sign Up" : "Sign In" }</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              { isSignup
                ? "Already have an account ?"
                : "Don't have an account ?"
              }
              <span onClick={switchMode}>
                { isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div> */}
    </div>
  )
}

export default Auth
