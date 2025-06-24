import React from 'react'
import {Link} from 'react-router-dom'
import {differenceInYears, parse} from 'date-fns'
import {HomeVideoCardInterface} from '../Interfaces/propsInterfaces'
import './index.css'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

const TrendingCard: React.FC<HomeVideoCardInterface> = observer(({details}) => {
  const { themeStore } = useStores()
  const { theme } = themeStore
  const {
    id,
    thumbnailUrl,
    title,
    channelName,
    viewCount,
    publishedAt,
  } = details
  const parsedDate = parse(publishedAt, 'MMMM dd, yyyy', new Date())
  const currentDate = new Date()
  const ageInYears = differenceInYears(currentDate, parsedDate)
  return (
    <Link data-testid="trendingCard" to={`/videos/${id}`} className="listStylingLink">
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
})

export default TrendingCard
