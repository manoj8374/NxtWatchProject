import Cookies from 'js-cookie'
import {HomeVideoCardDetailsApi} from '../components/Interfaces/propsInterfaces'
import {VideoDetails, Video, VideoContextInterface} from '../components/Interfaces'
import {differenceInYears, parse} from 'date-fns'

export const fetchLoginDetails = async (username: string, password: string)=>{
    const response = await fetch("https://apis.ccbp.in/login", {
        method: "POST",
        body: JSON.stringify({username, password})
    })
    return response
}

export const fetchHomeDetails = async(searchValue: string)=>{
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch(`https://apis.ccbp.in/videos/all?search=${searchValue}`,{
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      })
    const data = await response.json()
    if(response.ok){
        const convertedData = data.videos.map((eachItem : HomeVideoCardDetailsApi) => {
            const obj = {
              id: eachItem.id,
              publishedAt: eachItem.published_at,
              thumbnailUrl: eachItem.thumbnail_url,
              title: eachItem.title,
              viewCount: eachItem.view_count,
              channelName: eachItem.channel.name,
              profileImageUrl: eachItem.channel.profile_image_url,
            }
            return obj
        })
        return convertedData
    }
    
    throw new Error("Error Has Occured")
}

export const fetchGameDetails = async()=>{
  const jwtToken = Cookies.get('jwt_token')
  const response = await fetch(`https://apis.ccbp.in/videos/gaming`,{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    }
  })
  const data = await response.json()
  if(response.ok){
    const convertedData = data.videos.map((eachItem: VideoDetails) => {
      const obj = {
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }
      return obj
    })
    return convertedData
  }

  throw new Error("Error Has Occured")
}

export const fetchTrendingDetails = async()=>{
  const jwtToken = Cookies.get('jwt_token')
  const response = await fetch("https://apis.ccbp.in/videos/trending",{
    method: 'GET',
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  }})
  const data = await response.json()
  if(response.ok){
    const convertedData = data.videos.map((eachItem: Video) => {
      const obj = {
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        channelName: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
      }
      return obj
    })
    return convertedData
  }
  throw new Error("Error Has Occured")
}

export const fetchVideoItemDetails = async(id: string)=>{
  const jwtToken = Cookies.get('jwt_token');
  const response = await fetch(`https://apis.ccbp.in/videos/${id}`,{
    method: 'GET',
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  }})
  const data = await response.json()
  const parsedDate = parse(
    data.video_details.published_at,
    'MMMM dd, yyyy',
    new Date(),
  )
  const currentDate = new Date()
  const ageInYears = differenceInYears(currentDate, parsedDate)
  const obj = {
    id: data.video_details.id,
    description: data.video_details.description,
    publishedAt: data.video_details.published_at,
    thumbnailUrl: data.video_details.thumbnail_url,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    viewCount: data.video_details.view_count,
    channelName: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
    ageOfTheVideo: ageInYears,
  }
  if(response.ok){
    const convertedData = data.video_details
    return obj
  }
  throw new Error("Something went wrong")
  
}