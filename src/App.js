
import './App.css';
import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";

//components
import { Navbar, Sidebar, Footer} from './components'
import { Main, Basket, Checkout, History } from './pages';


// assets
import Get from './assets/tests/Get';


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
    <div id="App" className="relative min-w-[500px] max-w-[100vw] h-[100vh] flex flex-col my-0 justify-between items-center text-xl ">
      <div id="main" className="w-full h-[90%]  px-2 flex justify-between"> 
        <div id="mainbar_container" className=" w-full  h-full overflow-y-auto hover:overflow-y-scroll scrollbar">
          <Router>
            <div id="mainbar" className="w-full sticky top-0 bg-white h-max z-10 flex items-center">
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
          </Router>
          {/* <p className="p-4 cursor-pointer text-xl font-sans font-bold underline" onClick={()=>handleTest()}> 
            test data
          </p> */}

          
           
        </div>
        <div id="sidebar_container" className="hidden sm:flex sm:w-auto md:flex md:w-auto md:max-w-[24rem] lg:flex lg:w-auto lg:max-w-[24rem] xl:flex xl:w-auto xl:max-w-[24rem]border-l-2 px-4 ">
          <Sidebar />
        </div>
      </div>
      <footer id="footer" className="h-[10%] w-full bg-black">
        footer
      </footer>
      
    </div>
  );
}

export default App;
