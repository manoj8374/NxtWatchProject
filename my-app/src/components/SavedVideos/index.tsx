import React, {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {FaFire, FaFacebook, FaTwitter, FaLinkedin} from 'react-icons/fa'
import Header from '../Header'
import SideBar from '../SideBar'
import SavedVideoItem from '../SavedVideoItem'

import {ThemeContext} from '../ThemeContext'
import {VideoItemInterface} from '../Interfaces'
import './index.css'

const SavedVideos = () => {
  const {theme, savedVideos} = useContext(ThemeContext)
  return (
    <>
      <Header />
      <div className="HomePageMainContainer">
        <SideBar />
        <div
          className={`${
            theme === 'Dark' ? 'darkThemeTrendingPage' : ''
          } mainTrendingPageContainer`}
        >
          <div
            className={`${
              theme === 'Dark'
                ? 'darkThemeTopTrending'
                : 'lightThemeTrendingBackground'
            } TrendingContainerTop`}
          >
            <div className="iconBackground">
              <FaFire style={{color: 'red'}} size={40} />
            </div>
            <h1
              className={`${
                theme === 'Dark'
                  ? 'darkThemeTrendingHeading'
                  : 'lightThemeHeading'
              }`}
            >
              Saved Videos
            </h1>
          </div>
          {savedVideos.length === 0 ? (
            <div className="noSavedVideosContainer">
              <img
                className="noVideoSavedImage"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              />
              <h1
                className={`${
                  theme === 'Dark'
                    ? 'noSavedVideoHeadingDark'
                    : 'noSavedVideoHeadingLight'
                }`}
              >
                No saved videos found
              </h1>
              <p
                className={`${
                  theme === 'Dark'
                    ? 'noSavedVideoHeadingDark'
                    : 'noSavedVideoPara'
                }`}
              >
                You can save your videos while watching them
              </p>
            </div>
          ) : (
            <ul className="savedVideosUlContainer">
              {savedVideos.map((eachItem: VideoItemInterface) => {
                let c
                return <SavedVideoItem key={eachItem.id} details={eachItem} />
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default SavedVideos
