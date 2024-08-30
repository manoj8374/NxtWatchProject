import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {differenceInYears, parse} from 'date-fns'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { VideoContextInterface} from '../Interfaces'
import Header from '../Header'
import SideBar from '../SideBar'
import {ThemeContext} from '../ThemeContext'
import { RootState, AppDispatch } from '../../Redux/store'
import {fetchVideoItem} from '../../Redux/videoItemSlice'
import './index.css'
import Spinner from '../Spinner'
import FailureView from '../FailureScreen'

const sampleData = {
  id: "",
  description: "",
  publishedAt: "",
  thumbnailUrl: "",
  title: "",
  videoUrl: "",
  viewCount: "",
  channelName: "",
  profileImageUrl: "",
  subscriberCount: "",
  ageOfTheVideo: 0,
} //doubt clarify it tomorrow, doubt clarify it 

const VideoItem = () => {
  const {id} = useParams<{id: string}>()
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.videoItem.data)
  const isLoading = useSelector((state: RootState) => state.videoItem.loading)
  const errorView = useSelector((state: RootState) => state.videoItem.errorView)
  const {
    theme,
    saveTheVideo,
    AddToLikeVideo,
    likedVideos,
    AddToDislikeVideo,
    dislikedVideos,
    savedVideos,
  } = useContext(ThemeContext)

  useEffect(() => {

    const getData = async () => {
      if(id){
        await dispatch(fetchVideoItem(id))
      }
    }
    getData()
  }, [])

  const addVideo = () => {
    saveTheVideo(data)
  }

  const addToLikedVideos = () => {
    if(id){
      AddToLikeVideo(id)
    } 
  }

  const addToDislikedVideos = () => {
    if(id){
        AddToDislikeVideo(id)
    }
  }


  const LikedclassName = id && likedVideos.includes(id) ? 'likedStyling' : ''
  const DislikedclassName = id && dislikedVideos.includes(id) ? 'likedStyling' : ''
  const SavedClassName = savedVideos.some(eachItem => eachItem.id === id)
    ? 'likedStyling'
    : ''

  const renderData = ()=>{
    if(isLoading){
      return <Spinner />
    }
    if(errorView){
      return <FailureView/>
    }
    return (
      <div
      className={`${
        theme === 'Dark' ? 'videoItemDarkTheme' : ''
      } videoItemContainer`}
    >
      <div>
        <div className="videoPlayerStyling">
          <ReactPlayer width="99%" height="500px" url={data.videoUrl} />
        </div>
      </div>
      <div className="detailsVideoItemContainer">
        <p
          className={`${
            theme === 'Dark' ? 'titleVideoItemDark' : 'titleVideoItem'
          }`}
        >
          {data.title}
        </p>
        <div className="arrangeVideoMetaData displayRow">
          <div className="viewCountVideoItem displayRow">
            <p className="paraIconStyling">{data.viewCount} views</p>
            <p className="paraIconStyling">
              {data.ageOfTheVideo} years ago
            </p>
          </div>
          <div className="displayRow reactionsContainer">
            <div className="displayRow ContainerReaction">
              <button
                onClick={addToLikedVideos}
                className="displayRow videoItemButtonStyling"
              >
                <BiLike
                  size={23}
                  className={`${LikedclassName} reactionStylingIcon`}
                />
                <p className={`${LikedclassName} paraIconStyling`}>
                  Like
                </p>
              </button>
            </div>
            <div className="displayRow ContainerReaction">
              <button
                onClick={addToDislikedVideos}
                className="displayRow videoItemButtonStyling"
              >
                <BiDislike
                  size={23}
                  className={`${DislikedclassName} reactionStylingIcon`}
                />
                <p className={`${DislikedclassName} paraIconStyling`}>
                  Dislike
                </p>
              </button>
            </div>
            <div className="displayRow ContainerReaction">
              <button
                onClick={addVideo}
                className="displayRow videoItemButtonStyling"
              >
                <MdPlaylistAdd
                  size={23}
                  className={`${SavedClassName} reactionStylingIcon`}
                />
                <p className={`${SavedClassName} paraIconStyling`}>
                  {savedVideos.some(eachItem => eachItem.id === id)
                    ? 'Saved'
                    : 'Save'}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  
  if (data !== null) {
  return (
    <>
      <Header />
      <div className="HomePageMainContainer">
        <SideBar />
        {renderData()}
      </div>
    </>
  )}

  return null
}

export default VideoItem
