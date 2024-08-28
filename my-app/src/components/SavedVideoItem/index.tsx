import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {ThemeContext} from '../ThemeContext'
import {SavedVideoItemInterface} from '../Interfaces/propsInterfaces'
import './index.css'

const SavedVideoItem: React.FC <SavedVideoItemInterface> = ({details}) => {
  const {
    title,
    thumbnailUrl,
    channelName,
    viewCount,
    ageOfTheVideo,
    id,
  } = details
  const {theme, toggleTheme} = useContext(ThemeContext)
  return (
    <Link to={`/videos/${id}`} className="listStylingLink">
      <li className="listStylingSavedVideoItem">
        <div className="savedVideoArrangeItems">
          <img className="thumbnailImageSavedVideos" src={thumbnailUrl} />
          <div className="savedVideoContentsContainer">
            <h1
              className={`${
                theme === 'Dark'
                  ? 'trendingPageDarkThemeHeading'
                  : 'trendingPageLightThemeHeading'
              } headingSavedVideoItem`}
            >
              {title}
            </h1>
            <div className="arrangeInRowSaveLater">
              <p
                className={`${theme === 'Dark' ? 'viewAndDateSavedDark' : ''}`}
              >
                {channelName}
              </p>
              <div
                className={`${
                  theme === 'Dark' ? 'viewAndDateSavedDark' : ''
                } viewsAndDateSaved`}
              >
                <p>{viewCount} views .</p>
                <p>{ageOfTheVideo} years ago</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SavedVideoItem
