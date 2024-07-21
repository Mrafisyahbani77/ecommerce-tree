import React from 'react'
import NavbarUsers from '../component/NavbarUsers'
import Banner from './Banner'
import HomePages from './HomePages'

const userDashboard = () => {
   
  return (
    <div>
        <NavbarUsers/>
        <Banner/>
        <HomePages/>
    </div>
  )
}

export default userDashboard