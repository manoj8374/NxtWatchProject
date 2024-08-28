import React from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import HomeContents from '../HomeContents'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="HomePageMainContainer">
      <SideBar />
      <HomeContents />
    </div>
  </>
)

export default Home
