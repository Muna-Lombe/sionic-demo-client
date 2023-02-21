import React, { Suspense } from 'react'
import { FilterSearchResults, NoItems, Product } from '../components'
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { filteredProductsFromModel, productsMatchingSearch } from '../orm/selectors'
import { searchedProductTextArr } from '../js/slices/products/productsSlice'

const Search = () => {
  
  const SearchResults = ({ children }) => {
    const searchTextArr = JSON.parse(useSearchParams()[0].get('query'))
    // console.log("prods matching", searchTextArr )
    const products = useSelector(productsMatchingSearch(searchTextArr))

    return (
      <div id="mainbar-search__content" className=" w-full  p-2 grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] overflow-x-clip scroll-smooth gap-[38px] justify-center  transition-all  tag">
        {
          products.length
            ? products.map((i) => (<Product key={i.id} id={i.id} product={i.product} isSearchOrMain/>))
            : <NoItems />
        }
      </div>
    )
  }
  return (
    <div className="search-wrapper relative w-full flex flex-col md:flex-row">
      <Suspense fallback={<NoItems />}>
        <FilterSearchResults/>
        <SearchResults/>
      </Suspense>
    </div>
  )
}

export default Search