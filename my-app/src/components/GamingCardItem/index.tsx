import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {ThemeContext} from '../ThemeContext'
import {GamingCardItemInterface} from '../Interfaces/propsInterfaces'
import './index.css'

const GamingCardItem: React.FC<GamingCardItemInterface> = ({details}) => {
  const {id, thumbnailUrl, title, viewCount} = details
  const context = useContext(ThemeContext)
  const {theme, toggleTheme} = context
  return (
    <Link to={`/videos/${id}`} className="listStylingLink gamingLinkItem">
      <li className="gamingListItem">
        <img className="gamingThumbnailImage" src={thumbnailUrl} />
        <div className="arrangeContentsGaming">
          <p
            className={`${
              theme === 'Dark' ? 'darkThemeGameTitle' : ''
            } gamingTitle`}
          >
            {title}
          </p>
          <p>{viewCount} Watching Worldwide</p>
        </div>
      </li>
    </Link>
  )
}

export default GamingCardItem
