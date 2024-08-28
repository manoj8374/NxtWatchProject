import React, {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {FaFire, FaFacebook, FaTwitter, FaLinkedin} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {VideoDetails} from '../Interfaces'
import {GamingCardDetails} from '../Interfaces/propsInterfaces'
import Header from '../Header'
import SideBar from '../SideBar'
import GamingCardItem from '../GamingCardItem'
import {ThemeContext} from '../ThemeContext'
import './index.css'

const Gaming = () => {
  const [data, setData] = useState<GamingCardDetails[]>([])
  const context = useContext(ThemeContext)
  const {theme} = context

  useEffect(() => {
    const getData = async () => {
      const jwtToken = Cookies.get('jwt_token')

      const apiUrl = 'https://apis.ccbp.in/videos/gaming'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      try {
        const Data = await fetch(apiUrl, options)
        const response = await Data.json()
        console.log(response)
        const convertedData = response.videos.map((eachItem: VideoDetails) => {
          const obj = {
            id: eachItem.id,
            thumbnailUrl: eachItem.thumbnail_url,
            title: eachItem.title,
            viewCount: eachItem.view_count,
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
            theme === 'Dark' ? 'darkContainerGaming' : ''
          } gamingMainPageContainer`}
        >
          <div
            className={`${
              theme === 'Dark'
                ? 'DarkkThemeGamingBackground'
                : 'lightThemeGamingBackground'
            } GamingContainerTop`}
          >
            <div className="iconBackground">
              <SiYoutubegaming style={{color: 'red'}} size={40} />
            </div>
            <h1
              className={`${
                theme === 'Dark' ? 'gamingMainHeadingDark' : ''
              } lightThemeHeading`}
            >
              Gaming
            </h1>
          </div>
          <ul className="gamingULContainer">
            {data.map(eachItem => {
              let a
              return <GamingCardItem key={eachItem.id} details={eachItem} />
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Gaming
