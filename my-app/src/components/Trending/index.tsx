import React, {useEffect, useContext, ReactNode} from 'react'
import {FaFire} from 'react-icons/fa'
import Header from '../Header'
import SideBar from '../SideBar'
import TrendingCard from '../TrendingCard'
import Spinner from '../Spinner'
import './index.css'
import FailureView from '../FailureScreen'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

const Trending = observer(() => {
  const { trendingStore } = useStores()
  const { data, isLoading, errorView, trendingCount } = trendingStore

  const { themeStore } = useStores()
  const { theme } = themeStore

  useEffect(() => {
    trendingStore.fetchTrendingVideos()
  }, [])

  const renderData = (): ReactNode=>{
    if(isLoading){
      return <Spinner />
    }

    if(errorView){
      return <FailureView />
    }

    if(data.length !== 0){
        return <>
          {/* <div style={{margin: '10px 0', fontWeight: 'bold'}}>Trending Count: {trendingCount}</div> */}
          <ul className="trendingUlContainer">
            {data.map(eachItem => (
              <TrendingCard details={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </>
    }
  }

  return (
    <>
      <Header />
      <div className="HomePageMainContainer">
        <SideBar />
        <div data-testid="trendingMainPageContainer"
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
            <h1 data-testid="trendingHeading"
              className={`${
                theme === 'Dark'
                  ? 'darkThemeTrendingHeading'
                  : 'lightThemeHeading'
              }`}
            >
              Trending
            </h1>
          </div>
          {renderData()}
        </div>
      </div>
    </>
  )
})

export default Trending
