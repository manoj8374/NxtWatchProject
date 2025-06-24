import React from 'react'
import {Link} from 'react-router-dom'
import {GamingCardItemInterface} from '../Interfaces/propsInterfaces'
import './index.css'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

const GamingCardItem: React.FC<GamingCardItemInterface> = observer(({details}) => {
  const {id, thumbnailUrl, title, viewCount} = details
  const { themeStore } = useStores()
  const { theme } = themeStore
  return (
    <Link to={`/videos/${id}`} className="listStylingLink gamingLinkItem" data-testid="gamingCardItem">
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
})

export default GamingCardItem
