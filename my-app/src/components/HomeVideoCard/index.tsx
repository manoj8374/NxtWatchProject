import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {differenceInYears, parse} from 'date-fns'
import {ThemeContext} from '../ThemeContext'
import {HomeVideoCardInterface} from '../Interfaces/propsInterfaces'
import './index.css'

const HomeVideoCard: React.FC<HomeVideoCardInterface> = ({details}) => {
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
    <Link to={`/videos/${id}`} className="listStylingLink homeVideoItemCard">
      <li className="listItemVideoCard">
        <img src={thumbnailUrl} className="thumbnailImageHome" />
        <div className="thumbnailArrangeContentsHome">
          <div className="thumbnailContainerHome">
            <img className="channelLogoHome" src={profileImageUrl} />
          </div>
          <div className="thumbnailContentsColumn">
            <p
              className={`${
                theme === 'Dark' ? 'darkThemeColorVideoItem' : ''
              } paraHome`}
            >
              {title}
            </p>
            <div className="homeArrangeRowCard">
              <p>{channelName}</p>
              <div className="arrangeViewsAndData">
                <p>
                  {viewCount} views <span className="dotStyling">.</span>
                </p>
                <p>{ageInYears} years ago</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeVideoCard
