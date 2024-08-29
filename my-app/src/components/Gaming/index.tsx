import React, {useEffect, useContext, ReactNode} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {SiYoutubegaming} from 'react-icons/si'
import FailureView from '../FailureScreen'
import Header from '../Header'
import SideBar from '../SideBar'
import GamingCardItem from '../GamingCardItem'
import {RootState, AppDispatch} from '../../Redux/store'
import {ThemeContext} from '../ThemeContext'
import { fetchGamingDetails } from '../../Redux/gameSlice'
import Spinner from '../Spinner'

import './index.css'

const Gaming = () => {
  const context = useContext(ThemeContext)
  const {theme} = context

  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.game.data)
  const loading = useSelector((state: RootState) => state.game.isLoading)
  const error = useSelector((state: RootState) => state.game.errorView)

  useEffect(() => {
    const getData = async () => {
      const response = await dispatch(fetchGamingDetails())
    }
    getData()
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

    if(data.length !== 0){
      return <ul className="gamingULContainer">
      {data.map(eachItem => {
        let a
        return <GamingCardItem key={eachItem.id} details={eachItem} />
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
          {renderData()}
        </div>
      </div>
    </>
  )
}

export default Gaming
