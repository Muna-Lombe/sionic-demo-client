import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { AvatarIco, CartIco, HomeIco } from '../assets'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import NoItems from './NoItems'

const AppWrapper = ({children}) => {
  
  const FooterNav = ()=>(
    <Suspense fallback={<NoItems />}>
            
      <div id="footer_nav" className="float-right sticky bottom-4 left-[90%] right-1 min-h-[10%]  w-[60px] h-[180px] z-10 flex xs:hidden sm:hidden  md:hidden lg:hidden xl:hidden bg-white border border-gray-300 rounded-tl-lg rounded-bl-lg no_highlights">
        <div id="bottom_nav_bar" className="w-full mt-2  pt-2 px-2 flex flex-col-reverse justify-around gap-2">
          <div id="home_ico">
            <Link to="/">
              <HomeIco />
            </Link>

          </div>

          <div id="user_profile_ico">
            <Link to="/history">
              <AvatarIco size={"2.5rem"} />
            </Link>
          </div>
          <div id="cart_ico">
            <Link to="/cart">
              <CartIco isCartBtn={true} />
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  )
  const MainbarNav =() =>(
    <div id="mainbar_nav" className="sticky top-0 pr-2 w-full min-h-[10%] h-max flex items-center bg-white z-10">
      <Navbar />
    </div>
  )
  return (
    <Suspense fallback={<NoItems />}>

      <div id="App" className="dark relative min-w-[200px] w-auto max-w-[2528px] min-h-screen flex flex-col justify-start gap-4 2n-child:self-start">

        <MainbarNav/>
        
        {children}
        <FooterNav />
        <footer id="footer" className="w-full min-h-[20%] h-[12rem] flex self-baseline xs:sticky xs:top-full  z-10    bg-[#F8F8F8] no_highlights">
          <Footer />
        </footer>

      </div>
    </Suspense>

  )
}

export default AppWrapper