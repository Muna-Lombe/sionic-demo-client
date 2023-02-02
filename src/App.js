
import './App.css';
import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";

//components
import { Navbar, Sidebar, Footer, OrmReader} from './components'
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
  // useEffect(() => {
  //   (async function (){
  //     let data = await get.Products()
  //     console.log("data", data)
  //   }
  //   )()
  //   setProducts(get.Products());
    
  // }, [])
  console.log("app products", products)
  const handleTest=async ()=>{
    
    let data = await get.SortedProductCategories();
    setTestData(data)
    console.log(data);
  }
  
  return (
   
      <div  id="App" className="dark relative min-w-[200px] w-auto max-w-[2528px]  min-h-screen flex flex-col justify-between"> 
        <div id="main" className="w-auto h-auto  flex justify-between"> 
          <div id="mainbar_container" className=" w-full  h-max overflow-y-auto hover:overflow-y-scroll gap-1 scrollbar">
            
              <div id="mainbar" className="w-full min-h-[10%] sticky top-0 bg-white h-max z-10 flex items-center">
                <Navbar />
              </div>
              
              <Routes>
                <Route path="/" exact element={<Main categoryTags={categoryTags}/>} />
                <Route path="/cart" exact element={<Basket />} />
                <Route path="/checkout" exact element={<Checkout /> } /> 
                <Route path="/history" exact element={<History /> } />
                <Route path="/orm-reader" exact element={<OrmReader /> } />
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
          <div id="sidebar_container" className="hidden lg:flex lg:w-auto lg:max-w-[24rem] xl:flex xl:w-auto xl:max-w-[24rem] border-l-2 px-4 ">
            <Sidebar />
          </div>
        </div>
       
        <div id="footer_nav" className="float-right sticky bottom-4 left-[90%] right-1 min-h-[10%]  w-[60px] h-[180px] z-10 flex xs:hidden sm:hidden  md:hidden lg:hidden xl:hidden bg-white border border-gray-300 rounded-tl-lg rounded-bl-lg no_highlights">
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
                <CartIco isCartBtn={true} />
              </Link>
            </div>
          </div>
        </div>
        <footer id="footer" className="min-h-[20%] h-[12rem] z-10 flex   bg-[#F8F8F8] no_highlights">
          <Footer />
        </footer>

      </div>
    
    
  );
}

export default App;
