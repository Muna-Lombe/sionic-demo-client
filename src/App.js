
import './App.css';
import React,{useState, useEffect, lazy, Suspense} from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";
import AppWrapper from './components/AppWrapper';



function App() {


  //components
  const Main = lazy(() => import("./pages/Main"))
  const Search = lazy(() => import("./pages/Search"))
  const Basket = lazy(() => import("./pages/Basket"))
  const Checkout = lazy(() => import("./pages/Checkout"))
  const History = lazy(() => import("./pages/History"))
  const ShowProduct = lazy(()=> import("./pages/ShowProduct"))
 
  return (
    <AppWrapper>
      <Routes>
        <Route path="/" exact element={<Main/>} />
        <Route path="/product/:id" exact element={<ShowProduct />} />
        <Route path="/search" exact element={<Search />} />
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
    </AppWrapper> 
  );
}

export default App;
