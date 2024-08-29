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
  const {
    theme,
    saveTheVideo,
    AddToLikeVideo,
    likedVideos,
    AddToDislikeVideo,
    dislikedVideos,
    savedVideos,
  } = useContext(ThemeContext)

  const [data, setData] = useState<VideoContextInterface>(sampleData)
  const [dataLoaded, setDataLoaded] = useState(false)
  useEffect(() => {
    const getData = async () => {
      const jwtToken = Cookies.get('jwt_token')

      const apiUrl = `https://apis.ccbp.in/videos/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      try {
        const Data = await fetch(apiUrl, options)
        const response = await Data.json()
        const parsedDate = parse(
          response.video_details.published_at,
          'MMMM dd, yyyy',
          new Date(),
        )
        const currentDate = new Date()
        const ageInYears = differenceInYears(currentDate, parsedDate)
        const obj: VideoContextInterface = {
          id: response.video_details.id,
          description: response.video_details.description,
          publishedAt: response.video_details.published_at,
          thumbnailUrl: response.video_details.thumbnail_url,
          title: response.video_details.title,
          videoUrl: response.video_details.video_url,
          viewCount: response.video_details.view_count,
          channelName: response.video_details.channel.name,
          profileImageUrl: response.video_details.channel.profile_image_url,
          subscriberCount: response.video_details.channel.subscriber_count,
          ageOfTheVideo: ageInYears,
        }
        setData(obj)
        setDataLoaded(true)
      } catch (e) {
        console.log('error')
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

  
  if (data !== null) {
  return (
    <>
      <Header />
      <div className="HomePageMainContainer">
        <SideBar />
        {dataLoaded ? (
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
        ) : null}
      </div>
    </>
  )}

  return null
}

export default VideoItem
