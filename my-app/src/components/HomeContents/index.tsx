import React, {useState, useEffect, useContext} from 'react'

import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {GiCancel} from 'react-icons/gi'
import { Video } from '../Interfaces'
import {HomeVideoCardDetails} from '../Interfaces/propsInterfaces'
import HomeVideoCard from '../HomeVideoCard'
import FailureView from '../FailureScreen'
import {ThemeContext} from '../ThemeContext'
import './index.css'

const HomeContents = () => {
  const [data, setData] = useState<HomeVideoCardDetails[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [failedView, setFailedView] = useState(false)
  const [hideBanner, setHideBanner] = useState(false)
  
  const context = useContext(ThemeContext)
  const {theme} = context

  useEffect(() => {
    const getData = async () => {
      const jwtToken = Cookies.get('jwt_token')

      const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchValue}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      try {
        const Data = await fetch(apiUrl, options)
        const response = await Data.json()
        const convertedData = response.videos.map((eachItem : Video) => {
          const obj = {
            id: eachItem.id,
            publishedAt: eachItem.published_at,
            thumbnailUrl: eachItem.thumbnail_url,
            title: eachItem.title,
            viewCount: eachItem.view_count,
            channelName: eachItem.channel.name,
            profileImageUrl: eachItem.channel.profile_image_url,
          }
          return obj
        })
        setData(convertedData)
        setIsLoading(false)
      } catch (e) {
        console.log('error')
        setFailedView(true)
      }
    }
    getData()
  }, [searchValue])

  return (
    <div
      className={`${
        theme === 'Dark' ? 'darkBackgroundHomeVideoItem' : ''
      } homeContentsContainer`}
    >
      {!hideBanner ? (
        <div className="homeContainerBgImage">
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
            <button
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
      {failedView ? <FailureView /> : null}
      <ul className="itemsContainerHome">
        {data.map(eachItem => (
          <HomeVideoCard key={eachItem.id} details={eachItem} />
        ))}
      </ul>
      {data.length === 0 && !isLoading ? (
        <div className="failureContainer">
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
      ) : null}
    </div>
  )
}

export default HomeContents
