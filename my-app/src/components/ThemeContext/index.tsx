import React, {ReactChild, createContext, useState} from 'react'
import {VideoContextInterface, ThemeContextInterface, ThemeContextProps} from '../Interfaces'

const defaultThemeContext: ThemeContextInterface = {
  theme: 'light',
  toggleTheme: () => {},
  saveTheVideo: () => {},
  savedVideos: [],
  AddToLikeVideo: () => {},
  likedVideos: [],
  AddToDislikeVideo: () => {},
  dislikedVideos: [],
};

const ThemeContext = createContext<ThemeContextInterface>(defaultThemeContext)

const ThemeProvider: React.FC<ThemeContextProps> = ({children}) => {
  const [savedVideos, setSavedVideos] = useState<VideoContextInterface[]>([])
  const [likedVideos, setLikedVideos] = useState<string[]>([])
  const [dislikedVideos, setDisLikedVideos] = useState<string[]>([])
  const [theme, setTheme] = useState('Light')

  const toggleTheme = (): void => {
    setTheme(previousTheme => (previousTheme === 'Light' ? 'Dark' : 'Light'))
  }

  const saveTheVideo = (videoDetails: VideoContextInterface): void => {
    const isPresent = savedVideos.some(
      eachItem => eachItem.id === videoDetails.id,
    )
    if (!isPresent) {
      setSavedVideos(prevVideos => [...prevVideos, videoDetails])
    } else {
      const filteredArr = savedVideos.filter(
        eachItem => eachItem.id !== videoDetails.id,
      )
      setSavedVideos(filteredArr)
      console.log('Video Already Added')
    }
  }

  const AddToLikeVideo = (id: string): void => {
    if (dislikedVideos.includes(id)) {
      const filteredArr = dislikedVideos.filter(eachId => eachId !== id)
      setDisLikedVideos(filteredArr)
    }
    if (!likedVideos.includes(id)) {
      setLikedVideos(prevState => [...prevState, id])
    }
  }

  const AddToDislikeVideo = (id: string): void => {
    if (likedVideos.includes(id)) {
      const filteredArr = likedVideos.filter(eachId => eachId !== id)
      setLikedVideos(filteredArr)
    }
    if (!dislikedVideos.includes(id)) {
      setDisLikedVideos(prevState => [...prevState, id])
    }
  }

  const themeContextValue: ThemeContextInterface = {
    theme,
    toggleTheme,
    saveTheVideo,
    savedVideos,
    AddToLikeVideo,
    likedVideos,
    AddToDislikeVideo,
    dislikedVideos,
  }

  return (
    <ThemeContext.Provider
      value={themeContextValue}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext, ThemeProvider}
