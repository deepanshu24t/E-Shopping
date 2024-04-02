import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({children}) {
  return (
    <div>
        <Navbar></Navbar>
        <div className="content">
            {children}
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Layout