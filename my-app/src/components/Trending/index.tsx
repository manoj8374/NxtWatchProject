import React, {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {FaFire, FaFacebook, FaTwitter, FaLinkedin} from 'react-icons/fa'
import {Video} from '../Interfaces'
import {HomeVideoCardDetails} from '../Interfaces/propsInterfaces'
import Header from '../Header'
import SideBar from '../SideBar'
import TrendingCard from '../TrendingCard'

import {ThemeContext} from '../ThemeContext'
import './index.css'

const Trending = () => {
  const [data, setData] = useState<HomeVideoCardDetails[]>([])
  const context = useContext(ThemeContext)
  const {theme, toggleTheme} = context

  useEffect(() => {
    const getData = async () => {
      const jwtToken = Cookies.get('jwt_token')

      const apiUrl = 'https://apis.ccbp.in/videos/trending'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      try {
        const Data = await fetch(apiUrl, options)
        const response = await Data.json()

        const convertedData = response.videos.map((eachItem: Video) => {
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
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])

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
              Trending
            </h1>
          </div>
          <ul className="trendingUlContainer">
            {data.map(eachItem => {
              let c
              return <TrendingCard details={eachItem} key={eachItem.id} />
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Trending
