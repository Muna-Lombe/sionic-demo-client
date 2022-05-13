
import './App.css';
import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";

//components
import { Navbar, Sidebar, Footer} from './components'
import { Main, Basket, Checkout, History } from './pages';


// assets
import Get from './assets/tests/Get';
import { HomeIco, CartIco, AvatarIco } from './assets';


function App() {
  const [products, setProducts] = useState([])
  const [testData, setTestData] = useState([])
  const [categoryTags, setCategoryTags] = useState([
    ['День Рождения Гриши','#FF2D87'],
    ['Подарок коллегам','#FFA601'],
    ['Подарок','#FF7CB4'],
    ['Мишка','#FFA601'],
    ['Мартышка','#58CF18'],
    ['Игрушка','#2967FF']
  ])

  var get = new Get();

  
  // fetch products on app load
  useEffect(() => {
    setProducts(get.Products());
    
  }, [])

  const handleTest=async ()=>{
    let data = await get.SortedProductCategories();
    setTestData(data)
    console.log(data);
  }
  
  return (
    // sm:w-auto  md:w-full lg:w-full xl:w-full 
    // <div id="App" className="relative min-w-fit max-w-[100vw] h-[100vh] flex flex-col my-0 justify-between items-center ">
    <Router>
      <div className="min-h-screen flex flex-col justify-between"> 
        <div id="main" className="w-full h-auto  px-2 flex justify-between"> 
          <div id="mainbar_container" className=" w-full  h-max overflow-y-auto hover:overflow-y-scroll gap-1 scrollbar">
            
              <div id="mainbar" className="w-full min-h-[10%] sticky top-0 bg-white h-max z-10 flex items-center">
                <Navbar />
              </div>
              
              <Routes>
                <Route path="/" exact element={<Main categoryTags={categoryTags}/>} />
                <Route path="/cart" exact element={<Basket />} />
                <Route path="/checkout" exact element={<Checkout /> } />
                <Route path="/history" exact element={<History /> } />
                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                    </main>
                  }
                />
              </Routes>
            
              {/* <p className="p-4 cursor-pointer text-xl font-sans font-bold underline" onClick={()=>handleTest()}> 
                test data
              </p> */}

            
            
          </div>
          {/* sm:flex sm:w-auto md:flex md:w-auto md:max-w-[24rem] */}
          <div id="sidebar_container" className="hidden lg:flex lg:w-auto lg:max-w-[24rem] xl:flex xl:w-auto xl:max-w-[24rem]border-l-2 px-4 ">
            <Sidebar />
          </div>
        </div>
        <footer id="footer" className="min-h-[10%] h-auto p -4 z-10 flex   bg-white border border-gray-300 rounded-tl-lg rounded-bl-lg no_highlights">
          <h4>Footer</h4>
        </footer>
        <div id="footer_nav" className="fixed bottom-4 right-1 min-h-[10%]  w-[60px] h-[180px] z-10 flex  md:hidden lg:hidden xl:hidden bg-white border border-gray-300 rounded-tl-lg rounded-bl-lg no_highlights">
          <div id="bottom_nav_bar" className="w-full mt-2  pt-2 px-2 flex flex-col-reverse justify-around gap-2"> 
            <div id="home_ico">
              <Link to="/">
                <HomeIco />
              </Link>
        
            </div>
            
            <div id="user_profile_ico">
              <Link to="/history">
                <AvatarIco size={"2.5rem"}/>
              </Link>
            </div>
            <div id="cart_ico">
              <Link to="/cart">
                <CartIco />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Router>
    // </div> 
    
  );
}

export default App;
