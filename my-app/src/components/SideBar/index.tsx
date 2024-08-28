import React from 'react'
import {useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFire, FaFacebook, FaTwitter, FaLinkedin} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {ThemeContext} from '../ThemeContext'
import './index.css'

const buttonsList = [
  {name: 'Home', path: '/', icon: <IoMdHome className="iconSideBarStyling" />},
  {
    name: 'Trending',
    path: '/trending',
    icon: <FaFire className="iconSideBarStyling" />,
  },
  {
    name: 'Gaming',
    path: '/gaming',
    icon: <SiYoutubegaming className="iconSideBarStyling" />,
  },
  {
    name: 'Saved Videos',
    path: '/saved-videos',
    icon: <MdPlaylistAdd className="iconSideBarStyling" />,
  },
]

const SideBar = () => {
  const location = useLocation()
  const context = useContext(ThemeContext)
  const {theme, toggleTheme} = context
  return (
    <div
      className={`${
        theme === 'Dark' ? 'sideBarDarkBackground' : ''
      } sideBarMainContainer`}
    >
      <div>
        {buttonsList.map(eachButton => {
          let className = ''
          const isDark = theme === 'Dark'
          if (isDark && eachButton.path === location.pathname) {
            className = 'darkBackgroundActive'
          }

          if (!isDark && eachButton.path === location.pathname) {
            className = 'activeSideBar'
          }

          return (
            <div className={`${className}`}>
              <Link to={eachButton.path} className="listStylingLink">
                <button className="buttonContainerSideBar">
                  {eachButton.icon}
                  {/* <IoMdHome size={30} style={{color: 'red'}} /> */}
                  <h2
                    className={`${
                      theme === 'Dark' ? 'darkSideHeadingSideBar' : ''
                    } sideBarHeading`}
                  >
                    {eachButton.name}
                  </h2>
                </button>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="sideBarContactUs">
        <h3
          className={`${
            theme === 'Dark' ? 'darkThemeWhiteText' : ''
          } contactUsHeading`}
        >
          CONTACT US
        </h3>
        <div className="sideBarIcons">
          <FaFacebook size={30} style={{color: '#37538C'}} />
          <FaTwitter size={30} style={{color: '#3A9CD6'}} />
          <FaLinkedin size={30} style={{color: '#016EA8'}} />
        </div>
        <p
          className={`${
            theme === 'Dark' ? 'darkThemeWhiteText' : ''
          } contactUsPara`}
        >
          Enjoy! Now to see your channels and reccomendations!
        </p>
      </div>
    </div>
  )
}

export default SideBar
