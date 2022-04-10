import React, { useEffect, useState } from 'react'
import ProductListing from './ProductListing';

import { useDispatch } from 'react-redux';
import { fetchAsyncEngineeringSubjects, fetchAsyncArtsSubjects, fetchAsyncCommerceSubjects } from "../../redux/subjects/SubjectSlice";

const ProductCategoriesPage = () => {

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchAsyncEngineeringSubjects(searchText));
    dispatch(fetchAsyncArtsSubjects(searchText));
    dispatch(fetchAsyncCommerceSubjects(searchText));
  }, [searchText, dispatch]);

  // Backup when user clicks on the search button
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchText === "" || searchText === " ") {
      alert("Please enter a search searchText");
      return;
    } else {
      dispatch(fetchAsyncEngineeringSubjects(searchText));
      dispatch(fetchAsyncArtsSubjects(searchText));
      dispatch(fetchAsyncCommerceSubjects(searchText));
    }
    setSearchText("");
  }

  return (
    <div>
      <div className="banner-img">
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search Movies"
            onChange={(e) => setSearchText(e.target.value)} />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <ProductListing />
    </div>
  )
}

export default ProductCategoriesPage