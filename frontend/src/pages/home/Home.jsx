import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import "./Home.css"
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Fooddisplay from '../../components/Fooddisplay/Fooddisplay'
import Appdownload from '../../components/Appdownload/Appdownload'

const Home = () => {
  const [category,setCategory]=useState("All")
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <Fooddisplay category={category} setCategory={setCategory}/>
        <Appdownload/>
      
    </div>
  )
}

export default Home
