import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ThemeContext} from '../ThemeContext'
import { setUsername, setPassword, setTogglePassword } from '../../Redux/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import {RootState, AppDispatch} from '../../Redux/store'
import {fetchLogin} from '../../Redux/loginSlice'
import './index.css'

interface LoginInterface{
    username: string
    password: string
}

const Login: React.FC = () => {
  const context = useContext(ThemeContext)
  const {theme, toggleTheme} = context

  const username = useSelector((state: RootState) => state.login.username)
  const password = useSelector((state: RootState) => state.login.password)
  const showPassword = useSelector((state: RootState) => state.login.showPassword)
  const error = useSelector((state: RootState) => state.login.error)

  const dispatch = useDispatch<AppDispatch>()

  const [formStatus, setFormStatus] = useState('')
  const navigate = useNavigate()

  const onSubmitSuccess = (token: string) => {
    console.log(token)
    Cookies.set('jwt_token', token, {expires: 7})
    navigate("/")
  }

  const submitForm = async (e: any) => {
    e.preventDefault()
    const resultAction = await dispatch(fetchLogin())
    
  }

  const changeUsername = (name: string)=>{
    dispatch(setUsername(name))
  }

  const changePassword = (pass: string)=>{
    dispatch(setPassword(pass))
  }

  const togglePasswordFunc = ()=>{
    dispatch(setTogglePassword(showPassword))
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
            <input
              id="password"
              type="checkbox"
              onChange={() => togglePasswordFunc()}
            />
            <label
              htmlFor="password"
              className={`${theme === 'Dark' ? 'darkLabel' : ''}`}
            >
              Show Password
            </label>
          </div>
          <button onClick={submitForm} className="loginButtonStyling">
            Login
          </button>
          {error !== '' ? (
            <p className={`${theme === 'Dark' ? 'loginFormErrorMessage' : ''}`}>
              *{error}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  )
}

export default Login
