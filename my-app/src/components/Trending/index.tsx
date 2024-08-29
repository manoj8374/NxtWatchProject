import React, {useState, useEffect, useContext, ReactNode} from 'react'
import {FaFire} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {RootState, AppDispatch} from '../../Redux/store'
import Header from '../Header'
import SideBar from '../SideBar'
import TrendingCard from '../TrendingCard'
import {fetchTrendingVideos} from '../../Redux/trendingSlice'
import {ThemeContext} from '../ThemeContext'
import Spinner from '../Spinner'
import './index.css'
import FailureView from '../FailureScreen'

const Trending = () => {
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.trending.data)
  const isLoading = useSelector((state: RootState) => state.trending.isLoading)
  const errorView = useSelector((state: RootState)=> state.trending.errorView)

  const context = useContext(ThemeContext)
  const {theme} = context

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchTrendingVideos())
    }
    getData()
  }, [])

  const renderData = (): ReactNode=>{
    if(isLoading){
      return <Spinner />
    }

    if(errorView){
      return <FailureView />
    }

    if(data.length !== 0){
        return <ul className="trendingUlContainer">
        {data.map(eachItem => {
          return <TrendingCard details={eachItem} key={eachItem.id} />
        })}
      </ul>
    }
  }

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
          {renderData()}
        </div>
      </div>
    </>
  )
}

export default Trending
