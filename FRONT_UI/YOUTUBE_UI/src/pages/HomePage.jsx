import React from 'react'
import Home from '../components/Home'
import SideNavbar from '../components/SideNavbar'

export default function HomePage({isOpen}) {
  console.log("first",isOpen)
  return (
    <div className='home mt-14 flex'>
      <Home isOpen={isOpen}/>
    </div>
  )
}
