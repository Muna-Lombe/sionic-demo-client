
import './App.css';
import React,{useState, useEffect} from 'react';

//components
import {Product, Navbar, Sidebar, Footer, CategoryTag} from './components'
import { Main, Basket, Checkout } from './pages';

function App() {
  const [products, setProducts] = useState([])
  const [categoryTags, setCategoryTags] = useState([
    ['День Рождения Гриши','#FF2D87'],
    ['Подарок коллегам','#FFA601'],
    ['Подарок','#FF7CB4'],
    ['Мишка','#FFA601'],
    ['Мартышка','#58CF18'],
    ['Игрушка','#2967FF']
  ])
  
  // fetch products on app load
  useEffect(() => {
    // fetchProducts();
  }, [])

  const fetchProducts = async() => {
    const baseUrl = '';
    const data = await fetch(`${baseUrl}/`);
    const productData = await data.json();
    setProducts(productData)
  }
  
  
  return (
    <div id="App" className="flex flex-col h-[100vh]  my-0 justify-center items-center">
      <div id="main" className="h-[90%] w-full px-2 flex justify-between"> 
        <div id="mainbar_container" className="container h-full overflow-y-auto hover:overflow-y-scroll scrollbar">
            <div id="mainbar" className="sticky top-0 bg-white h-[5rem] z-10 flex items-center">
              <Navbar />
            </div>
            
            {/* <Main categoryTags={categoryTags}/> */}
            {/* <Basket /> */}
            <Checkout />
             
            
             
            
        </div>
        <div id="sidebar_container" className=" border-l-2 px-4 ">
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
