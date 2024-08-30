import React, {useContext, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import {ThemeContext} from '../ThemeContext'
import { useNavigate } from 'react-router-dom'
import './index.css'

interface LoginInterface{
    username: string
    password: string
}

const Login: React.FC = () => {
  const context = useContext(ThemeContext)
  const {theme, toggleTheme} = context

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [formStatus, setFormStatus] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmitSuccess = (token: string) => {
    console.log(token)
    Cookies.set('jwt_token', token, {expires: 7})
    navigate('/')
  }

  const submitForm = async (e: any) => {
    e.preventDefault()
    const data : LoginInterface = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }


    const responseData = await fetch('https://apis.ccbp.in/login', options)
    const dataResponse = await responseData.json()

    if (responseData.ok) {
      onSubmitSuccess(dataResponse.jwt_token)
    } else {
      setFormStatus(dataResponse.error_msg)
    }
  }

  const changeUsername = (name: string)=>{
    setUsername(name)
  }

  const changePassword = (pass: string)=>{
    setPassword(pass)
  }

  const togglePasswordFunc = ()=>{
    setShowPassword(!showPassword)
  }

  useEffect(()=>{
    if(Cookies.get('jwt_token')){
      navigate('/')
    }
  },[])

  if(Cookies.get("jwt_token")){
    return null
  }

  return (
    <div
      className={`${theme === 'Dark' ? 'darkLoginPage' : ''} loginContainer`}
    >
      <form
        className={`${
          theme === 'Dark' ? 'darkSubContainer' : ''
        } subLoginContainer`}
      >
        <img
          className="loginPageLogo"
          src={`${
            theme === 'Dark'
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }`}
        />
        <div className="loginFormContainer">
          <label
            className={`${theme === 'Dark' ? 'darkLabel' : ''} labelLogin`}
            htmlFor="username"
          >
            USERNAME
          </label>
          <input
            value={username}
            onChange={(e) => changeUsername(e.target.value)}
            className="inputStylingLogin"
            placeholder="Username"
            id="username"
            name = "username"
          />
          <label
            className={`${theme === 'Dark' ? 'darkLabel' : ''} labelLogin`}
            htmlFor="password"
          >
            PASSWORD
          </label>
          <input
            value={password}
            onChange={e => changePassword(e.target.value)}
            className="inputStylingLogin"
            id="password"
            placeholder="Password"
            type={`${showPassword ? 'text' : 'password'}`}
          />
          <div>
            <label className={`${theme === 'Dark' ? 'darkLabel' : ''}`}>
            <input
              id="password"
              type="checkbox"
              onChange={() => togglePasswordFunc()}
              name = "showPassword"
            /> Show Password
            </label>
          </div>
          <button onClick={submitForm} className="loginButtonStyling">
            Login
          </button>
          {formStatus !== '' ? (
            <p className={`${theme === 'Dark' ? 'loginFormErrorMessage' : ''}`}>
              *{formStatus}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  )
}

export default Login
