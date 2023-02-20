import React from 'react'
import { FilterSearchResults } from '../components'

const Search = () => {
  
  const SearchResults = ({ children }) => {
    return (
      <></>
    )
  }
  return (
    <div className="search-wrapper">
      <FilterSearchResults/>
      <SearchResults/>

    </div>
  )
}

export default Search