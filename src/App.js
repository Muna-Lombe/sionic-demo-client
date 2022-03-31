
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
    <div id="App" className="relative w-[100vw] min-w-[900px] h-[100vh] flex flex-col my-0 justify-center items-center">
      <div id="main" className="w-full h-[90%]  px-2 flex justify-between"> 
        <div id="mainbar_container" className="w-max  h-full overflow-y-auto hover:overflow-y-scroll scrollbar">
          <Router>
            <div id="mainbar" className="sticky top-0 bg-white h-[5rem] z-10 flex items-center">
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
        <div id="sidebar_container" className="w-max border-l-2 px-4 ">
          <Sidebar />
        </div>
      </div>
      <footer id="footer" className="h-[10%] w-full bg-black sticky bottom-0">
        footer
      </footer>
      
    </div>
  );
}

export default App;
