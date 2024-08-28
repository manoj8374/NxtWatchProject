import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {differenceInYears, parse} from 'date-fns'
import {ThemeContext} from '../ThemeContext'
import {HomeVideoCardInterface} from '../Interfaces/propsInterfaces'
import './index.css'

const TrendingCard: React.FC<HomeVideoCardInterface> = ({details}) => {
  const context = useContext(ThemeContext)
  const {theme} = context
  const {
    id,
    thumbnailUrl,
    profileImageUrl,
    title,
    channelName,
    viewCount,
    publishedAt,
  } = details
  const parsedDate = parse(publishedAt, 'MMMM dd, yyyy', new Date())
  const currentDate = new Date()
  const ageInYears = differenceInYears(currentDate, parsedDate)
  return (
    <Link to={`/videos/${id}`} className="listStylingLink">
      <li className="trendingCardListItem">
        <img className="trendingImageThumbnail" src={thumbnailUrl} />
        <div>
          <h1
            className={`${
              theme === 'Dark'
                ? 'trendingPageDarkThemeHeading'
                : 'trendingPageLightThemeHeading'
            }`}
          >
            {title}
          </h1>
          <div className="arrangeInRowTrending">
            <p className="lightThemeChannelName">{channelName}</p>
            <div className="arrangeRowTrending">
              <p>
                {viewCount} <span className="dotStyling">.</span>
              </p>
              <p>{ageInYears} years ago</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingCard
