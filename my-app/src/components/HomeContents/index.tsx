import React, {useState, useEffect, useContext, ReactNode} from 'react'
import {FaSearch} from 'react-icons/fa'
import {GiCancel} from 'react-icons/gi'
import HomeVideoCard from '../HomeVideoCard'
import FailureView from '../FailureScreen'
import Spinner from '../Spinner'
import './index.css'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

const HomeContents = observer(() => {
  const [searchValue, setSearchValue] = useState('')
  const [hideBanner, setHideBanner] = useState(false)
  
  const { themeStore } = useStores()
  const { theme } = themeStore

  const { homeStore } = useStores()
  const { data: videos, errorView: failedView, isLoading } = homeStore

  useEffect(() => {
    homeStore.fetchVideos(searchValue)
  }, [searchValue])

  const renderContent = (): ReactNode=>{
    if(isLoading){
        return(
          <Spinner/>
        )
    }
    if(failedView){
      return <FailureView/>
    }

    if(videos.length !== 0){
      return <ul className="itemsContainerHome">
    {videos.map(eachItem => (
      <HomeVideoCard  key={eachItem.id} details={eachItem} />
    ))}
  </ul>
    }
    
      return (
        <div data-testid="noVideosScreen" className="failureContainer">
        <img
          className="failureImage"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        />
        <h1
          className={`${
            theme === 'Dark'
              ? 'darkThemeHeadingFailure'
              : 'lightThemeHeadingFailure'
          } failureHeading`}
        >
          No search Results Found
        </h1>
        <p className="failurePara">
          Try different key words or remove search filter
        </p>
        <button onClick={() => setSearchValue('')} className="failureButton">
          Retry
        </button>
      </div>
      )
    
  }

  return (
    <div data-testid="homeContentsContainer"
      className={`${
        theme === 'Dark' ? 'darkBackgroundHomeVideoItem' : ''
      } homeContentsContainer`}
    >
      {!hideBanner ? (
        <div className="homeContainerBgImage" data-testid="banner">
          <div className="bannerInsideContents">
            <div className="itemsHeaderContents">
              <img
                className="bannerLogo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              />
              <p className="bannerHeading">
                Buy Nxt Watch Premium prepaid plans with UPI
              </p>
              <button className="bannerButton">GET IT NOW</button>
            </div>
            <button data-testid="cancelBannerButton"
              className="cancelButtonStylingHeader"
              onClick={() => setHideBanner(true)}
            >
              <GiCancel size={25} className="arrangeCancelButton" />.
            </button>
          </div>
        </div>
      ) : null}
      <div className="homeContentsSearchContainer">
        <input
          placeholder="Search"
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className={`${
            theme === 'Dark' ? 'darkInputHome' : ''
          } homeContentsSearch`}
        />
        <button
          className={`${
            theme === 'Dark' ? 'homeContentsButtonDark' : ''
          } homeContentsButton`}
        >
          <FaSearch size={15} style={{color: 'grey'}} />.
        </button>
      </div>
      {renderContent()}
    </div>
  )
})

export default HomeContents
