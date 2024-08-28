import React, {useEffect, useState, useContext} from 'react'
import {ThemeContext} from '../ThemeContext'
import './index.css'

const FailureView = () => {
  const context = useContext(ThemeContext)
  const {theme} = context
  return (
    <div className="failureContainer">
      <img
        className="failureImage"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      />
      <h1
        className={`${
          theme === 'Dark'
            ? 'darkThemeHeadingFailure'
            : 'lightThemeHeadingFailure'
        } failureHeading`}
      >
        Oops! Something Went Wrong
      </h1>
      <p className="failurePara">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button className="failureButton">Retry</button>
    </div>
  )
}

export default FailureView
