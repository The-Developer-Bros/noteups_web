import React, { useEffect } from 'react'
import ProductListing from './ProductListing';

import { useDispatch } from 'react-redux';
import { fetchAsyncEngineeringSubjects, fetchAsyncArtsSubjects, fetchAsyncCommerceSubjects } from "../../redux/subjects/SubjectSlice";

const ProductCategoriesPage = () => {

  const dispatch = useDispatch();
  const searchText = "computer";

  useEffect(() => {
    dispatch(fetchAsyncEngineeringSubjects(searchText));
    dispatch(fetchAsyncArtsSubjects(searchText));
    dispatch(fetchAsyncCommerceSubjects(searchText));
  }, [dispatch]);



  return (
    <div>
      <div className="banner-img">
      </div>
      <ProductListing />
    </div>
  )
}

export default ProductCategoriesPage