import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {differenceInYears, parse} from 'date-fns'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Cookies from 'js-cookie'
import { VideoContextInterface} from '../Interfaces'
import Header from '../Header'
import SideBar from '../SideBar'
import {ThemeContext} from '../ThemeContext'
import './index.css'
import Spinner from '../Spinner'
import FailureView from '../FailureScreen'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

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
}

const VideoItem = observer(() => {
  const {id} = useParams<{id: string}>()
  const { videoItemStore, savedVideosStore, userPreferencesStore, themeStore } = useStores()
  const data = videoItemStore.data || sampleData
  const isLoading = videoItemStore.loading
  const errorView = videoItemStore.errorView
  const { theme } = themeStore

  useEffect(() => {
    if(id){
      videoItemStore.fetchVideoItem(id)
    }
  }, [id])

  const addVideo = () => {
    savedVideosStore.saveVideo(data)
  }

  const addToLikedVideos = () => {
    if(id){
      userPreferencesStore.addToLikedVideos(id)
    } 
  }

  const addToDislikedVideos = () => {
    if(id){
        userPreferencesStore.addToDislikedVideos(id)
    }
  }

  const LikedclassName = id && userPreferencesStore.isVideoLiked(id) ? 'likedStyling' : ''
  const DislikedclassName = id && userPreferencesStore.isVideoDisliked(id) ? 'likedStyling' : ''
  const SavedClassName = savedVideosStore.isVideoSaved(id || '')
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
      <div data-testid="videoItemContainer"
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
                  {savedVideosStore.isVideoSaved(id || '')
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
})

export default VideoItem
