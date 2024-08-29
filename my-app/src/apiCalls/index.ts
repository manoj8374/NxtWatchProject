import Cookies from 'js-cookie'
import {HomeVideoCardDetailsApi} from '../components/Interfaces/propsInterfaces'
import {VideoDetails, Video} from '../components/Interfaces'

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
        console.log(convertedData)
        return convertedData
    }
    
    throw new Error(data.error_msg)
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
  console.log(data)
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
  throw new Error(data.error_msg)
}