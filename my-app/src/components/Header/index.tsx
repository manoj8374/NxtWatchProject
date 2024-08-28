import React, {useContext} from 'react'
import {useNavigate, Link, useLocation, Navigate} from 'react-router-dom'
import {WiMoonWaningCrescent1} from 'react-icons/wi'
import {TiAdjustBrightness} from 'react-icons/ti'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {RxHamburgerMenu, RxCross1} from 'react-icons/rx'
import {IoIosLogOut, IoMdHome} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {ThemeContext} from '../ThemeContext'
import {VideoContextInterface} from '../Interfaces'
import 'reactjs-popup/dist/index.css'
import './index.css'

const Header: React.FC = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('ThemeToggleButton must be used within a ThemeProvider');
  }
  const {theme, toggleTheme} = context
  const navigate = useNavigate()
  const location = useLocation()

  const BackgroundclassName =
    theme === 'Dark' ? 'darkActiveNavBar' : 'lightActiveNavBar'

  const toogleMode = () => {
    toggleTheme()
  }

  const logout = () => {
    Cookies.remove('jwt_token')
    navigate("/")
  }

  const MobileRenderPopUpComponent = ()=>(
      <div>
      <div className="mobileNavBarContentsContainer">
        <div className="wrongSymbolContainer">
          <button
            className="headerTransparentBackground"
            type="button"
          >
            <RxCross1
              className={`${
                theme === 'Dark' ? 'darkWrongStyling' : ''
              } wrongStlyingNav`}
              size={25}
            />
            .
          </button>
        </div>
        <div className="buttonsContainerNavBarMobile">
          <div
            className={`${
              location.pathname === '/' ? BackgroundclassName : ''
            } mobileNavBarItem`}
          >
            <div className="arrangeRowWidth">
              <Link to="/" className="arrangeInRowLinkItem">
                <IoMdHome
                  size={35}
                  className={`${
                    theme === 'Dark' ? 'mobileIconStylingNavBar' : ''
                  } ${
                    location.pathname === '/' ? 'redIconStyling' : ''
                  }`}
                />
                <p
                  className={`${
                    theme === 'Dark' ? 'mobileIconStylingNavBar' : ''
                  } paraMobileNavBar`}
                >
                  Home
                </p>
              </Link>
            </div>
          </div>
          <div
            className={`${
              location.pathname === '/trending'
                ? BackgroundclassName
                : ''
            } mobileNavBarItem`}
          >
            <div className="arrangeRowWidth">
              <Link to="/trending" className="arrangeInRowLinkItem">
                <FaFire
                  size={35}
                  className={`${
                    theme === 'Dark' ? 'mobileIconStylingNavBar' : ''
                  } ${
                    location.pathname === '/trending'
                      ? 'redIconStyling'
                      : ''
                  }`}
                />
                <p
                  className={`${
                    theme === 'Dark' ? 'mobileIconStylingNavBar' : ''
                  } paraMobileNavBar`}
                >
                  Trending
                </p>
              </Link>
            </div>
          </div>
          <div
            className={`${
              location.pathname === '/gaming' ? BackgroundclassName : ''
            } mobileNavBarItem`}
          >
            <div className="arrangeRowWidth">
              <Link to="/gaming" className="arrangeInRowLinkItem">
                <SiYoutubegaming
                  size={35}
                  className={`${
                    theme === 'Dark' ? 'mobileIconStylingNavBar' : ''
                  } ${
                    location.pathname === '/gaming'
                      ? 'redIconStyling'
                      : ''
                  }`}
                />
                <p
                  className={`${
                    theme === 'Dark' ? 'mobileIconStylingNavBar' : ''
                  } paraMobileNavBar`}
                >
                  Gaming
                </p>
              </Link>
            </div>
          </div>
          <div
            className={`${
              location.pathname === '/saved-videos'
                ? BackgroundclassName
                : ''
            } mobileNavBarItem`}
          >
            <div className="arrangeRowWidth">
              <Link to="/saved-videos" className="arrangeInRowLinkItem">
                <MdPlaylistAdd
                  size={35}
                  className={`${
                    theme === 'Dark' ? 'mobileIconStylingNavBar' : ''
                  } ${
                    location.pathname === '/saved-videos'
                      ? 'redIconStyling'
                      : ''
                  }`}
                />
                <p
                  className={`${
                    theme === 'Dark' ? 'mobileIconStylingNavBar' : ''
                  } paraMobileNavBar`}
                >
                  Saved Videos
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const LogOutPopUp = ()=> (
        <>
          <div
            className={`${
              theme === 'Dark' ? 'darkContainerLogoutMain' : ''
            } logoutPopUpContainer`}
          >
            <h3
              className={
                theme === 'Dark'
                  ? 'darkThemeStylingLogoutPopUp'
                  : 'lightThemeStylingLogoutPopUp'
              }
            >
              Are you sure, you want to logout?
            </h3>
            <div className="buttonContainerLogout">
              <button
                type="button"
                className={`${
                  theme === 'Dark' ? 'cancelButtonDarkStyling' : ''
                } cancelLogoutButtonModal lightThemeLogoutText darkThemeLogoutCance`}
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="logoutButtonModal lightThemeLogoutText"
              >
                Confirm
              </button>
            </div>
          </div>
        </>
  )

  const ConfirmPopUp = ()=>(
    <>
      <div
        className={`${
          theme === 'Dark' ? 'darkContainerLogoutMain' : ''
        } logoutPopUpContainer`}
      >
        <h3
          className={
            theme === 'Dark'
              ? 'darkThemeStylingLogoutPopUp'
              : 'lightThemeStylingLogoutPopUp'
          }
        >
          Are you sure, you want to logout?
        </h3>
        <div className="buttonContainerLogout">
          <button
            type="button"
            // onClick={() => close()}
            className={`${
              theme === 'Dark' ? 'cancelButtonDarkStyling' : ''
            } cancelLogoutButtonModal lightThemeLogoutText darkThemeLogoutCance`}
          >
            Cancel
          </button>
          <button
            onClick={logout}
            className="logoutButtonModal lightThemeLogoutText"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  )

  return (
    <div
      className={`${
        theme === 'Dark' ? 'darkBackgroundHeader' : ''
      } headerMainContainer`}
    >
      <Link to="/" className="linkHeaderStyling">
        <img
          className="headerLogo"
          src={`${
            theme === 'Dark'
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }`}
        />
      </Link>
      <div className="mobileHeaderElements">
        <button className="headerToggleButtonStyling">
          {theme === 'Dark' ? (
            <TiAdjustBrightness
              size={40}
              style={{color: 'white'}}
              onClick={toogleMode}
            />
          ) : (
            <WiMoonWaningCrescent1
              size={40}
              className="rotateDarkModeImage"
              onClick={toogleMode}
            />
          )}
          .
        </button>

        <Popup
          contentStyle={{
            backgroundColor: `${theme === 'Dark' ? '#212121' : ''}`,
            width: '100%',
            height: '100%',
          }}
          modal
          trigger={
            <button className="headerTransparentBackground">
              <RxHamburgerMenu
                size={40}
                className={`${
                  theme === 'Dark' ? 'lightColorNavBar' : 'darkColorNavBar'
                }`}
              />
              .
            </button>
          }
          position="bottom center"
        >
          {MobileRenderPopUpComponent()}
        </Popup>
        <Popup
          contentStyle={{
            backgroundColor: `${theme === 'Dark' ? '#212121' : ''}`,
          }}
          modal
          trigger={
            <button className="headerTransparentBackground">
              <IoIosLogOut
                size={40}
                className={`${
                  theme === 'Dark' ? 'lightColorNavBar' : 'darkColorNavBar'
                }`}
              />
              .
            </button>
          }
          position="bottom center"
        >
            {LogOutPopUp()}
        </Popup>
      </div>
      <div className="headerElements">
        <button className="headerToggleButtonStyling">
          {theme === 'Dark' ? (
            <TiAdjustBrightness
              size={40}
              style={{color: 'white'}}
              onClick={toogleMode}
            />
          ) : (
            <WiMoonWaningCrescent1
              size={50}
              className="rotateDarkModeImage"
              onClick={toogleMode}
            />
          )}
          .
        </button>

        <img
          className="profilePicHeader"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
        />
        <Popup
          contentStyle={{
            backgroundColor: `${theme === 'Dark' ? '#212121' : ''}`,
          }}
          modal
          trigger={<button className="logoutStyling">Logout</button>}
          position="bottom center"
        >
            {ConfirmPopUp()}
        </Popup>
      </div>
    </div>
  )
}

export default Header
