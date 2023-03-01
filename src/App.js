
import './App.css';
import React,{useState, useEffect, lazy, Suspense} from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";

//components
import { OrmReader} from './components'
import { Main, Basket, Checkout, History } from './pages';


// assets
import Get from './assets/tests/Get';
import { HomeIco, CartIco, AvatarIco } from './assets';
import AppWrapper from './components/AppWrapper';
// import ShowProduct from './pages/ShowProduct';
// import Search from './pages/Search';


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

  const Main = lazy(() => import("./pages/Main"))
  const Search = lazy(() => import("./pages/Search"))
  const Checkout = lazy(() => import("./pages/Checkout"))
  const History = lazy(() => import("./pages/History"))
  const ShowProduct = lazy(()=> import("./pages/ShowProduct"))
  // fetch products on app load
  // useEffect(() => {
  //   (async function (){
  //     let data = await get.Products()
  //     console.log("data", data)
  //   }
  //   )()
  //   setProducts(get.Products());
    
  // }, [])
  const handleTest=async ()=>{
    
    let data = await get.SortedProductCategories();
    setTestData(data)
    console.log(data);
  }
  return (
    <AppWrapper>
      <Routes>
        <Route path="/" exact element={<Main categoryTags={categoryTags}/>} />
        <Route path="/product/:id" exact element={<ShowProduct />} />
        <Route path="/search" exact element={<Search />} />
        <Route path="/cart" exact element={<Basket />} />
        <Route path="/checkout" exact element={<Checkout /> } /> 
        <Route path="/history" exact element={<History /> } />
        {/* <Route path="/orm-reader" exact element={<OrmReader />} /> */}
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
    </AppWrapper> 
  );
}

export default App;
