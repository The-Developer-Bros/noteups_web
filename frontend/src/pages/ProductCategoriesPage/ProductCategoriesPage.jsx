import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncArtsSubdomains, fetchAsyncCommerceSubdomains, fetchAsyncEngineeringSubdomains } from "../../redux/slices/SubdomainSlice";
import ProductCategories from './ProductCategories';


const ProductCategoriesPage = () => {

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchAsyncEngineeringSubdomains(searchText));
    dispatch(fetchAsyncArtsSubdomains(searchText));
    dispatch(fetchAsyncCommerceSubdomains(searchText));
  }, [searchText, dispatch]);

  // Backup when user clicks on the search button
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchText === "" || searchText === " ") {
      alert("Please enter a search searchText");
      return;
    } else {
      dispatch(fetchAsyncEngineeringSubdomains(searchText));
      dispatch(fetchAsyncArtsSubdomains(searchText));
      dispatch(fetchAsyncCommerceSubdomains(searchText));
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
      <ProductCategories />
    </div>
  )
}

export default ProductCategoriesPage