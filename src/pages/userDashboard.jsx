import React from 'react'
import NavbarUsers from '../component/NavbarUsers'
import Banner from './Banner'
import Product from './Product'

const userDashboard = () => {
   
  return (
    <div>
        <NavbarUsers/>
        <Banner/>
        <Product/>
    </div>
  )
}

export default userDashboard