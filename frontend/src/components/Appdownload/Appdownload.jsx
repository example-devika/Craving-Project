import React from 'react'
import "./Appdownload.css"
import { assets } from '../../assets/assets'

const Appdownload = () => {
  return (
    <div className='appdownload' id='appdownload'>
    <p>For Better Experience Download <br /> Cravings App</p>
    <div className="app-platforms">
<img src={assets.playstore} alt="" />
<img src={assets.appstore} alt="" />

    </div>
  
</div>
  )
}

export default Appdownload
