import React, {useEffect, useContext, ReactNode} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import FailureView from '../FailureScreen'
import Header from '../Header'
import SideBar from '../SideBar'
import GamingCardItem from '../GamingCardItem'
import Spinner from '../Spinner'
import './index.css'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

const Gaming: React.FC = observer(() => {
  const { themeStore } = useStores()
  const { theme } = themeStore

  const { gamingStore } = useStores()
  const { data, isLoading: loading, errorView: error } = gamingStore

  useEffect(() => {
    gamingStore.fetchGamingVideos()
  }, [])

  const renderData = (): ReactNode=>{
    if(loading){
      return (
        <Spinner/>
      )
    }

    if(error){
      return <FailureView/>
    }

    return <>
      <ul className="gamingULContainer">
        {data.map(eachItem => (
          <GamingCardItem key={eachItem.id} details={eachItem} />
        ))}
      </ul>
    </>
  }

  return (
    <>
      <Header />
      <div className="HomePageMainContainer">
        <SideBar />
        <div data-testid="gamingMainPageContainer"
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
              <h1 data-testid="gamingHeading"
              className={`${
                theme === 'Dark' ? 'gamingMainHeadingDark' : ''
              } lightThemeHeading`}
            >
              Gaming
            </h1>
          </div>
          {renderData()}
        </div>
      </div>
    </>
  )
})

export default Gaming
