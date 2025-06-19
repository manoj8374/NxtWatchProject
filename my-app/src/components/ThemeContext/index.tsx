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
  const [theme, setTheme] = useState('Light')

  const toggleTheme = (): void => {
    setTheme(previousTheme => (previousTheme === 'Light' ? 'Dark' : 'Light'))
  }

  const themeContextValue: ThemeContextInterface = {
    theme,
    toggleTheme,
    saveTheVideo: () => {},
    savedVideos: [],
    AddToLikeVideo: () => {},
    likedVideos: [],
    AddToDislikeVideo: () => {},
    dislikedVideos: [],
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
