import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncArtsSubjects, fetchAsyncCommerceSubjects, fetchAsyncEngineeringSubjects } from '../../redux/slices/SubjectSlice';
import "./ProductListingPage.scss";
import ProductListingFilter from './ProductListingFilter';
import ProductListingCard from './ProductListingCard';
import axios from 'axios';
import { listProducts } from '../../redux/actions/ProductActions';

function ProductListingPage() {

  const [all, setAll] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeSubdomain, setActiveSubdomain] = useState("all");

  const url = window.location.href;
  const urlArray = url.split("/");

  const domain = urlArray[urlArray.length - 2];
  const subdomain = urlArray[urlArray.length - 1];


  // useEffect(() => {
  //   const fetchSubjects = async () => {
  //     switch (domain) {
  //       case "engineering":
  //         const engineeringSubdomains = await axios.get(`/api/engineering/subdomains`);
  //         console.log(engineeringSubdomains.data);
  //         setAll(engineeringSubdomains.data);
  //         break;
  //       case "arts":
  //         const artsSubdomains = await axios.get(`/api/arts/subdomains`);
  //         setAll(artsSubdomains.data);
  //         break;
  //       case "commerce":
  //         const commerceSubdomains = await axios.get(`/api/commerce/subdomains`);
  //         setAll(commerceSubdomains.data);
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   fetchSubjects();
  // }, [domain]);

  // useEffect(() => {
  //   const fetchSubjects = async () => {
  //     const engineeringSubdomains = await axios.get(`/api/engineering/subdomains`);
  //     const artsSubdomains = await axios.get(`/api/arts/subdomains`);
  //     const commerceSubdomains = await axios.get(`/api/commerce/subdomains`);

  //     console.log(engineeringSubdomains.data.folders);
  //     console.log(artsSubdomains.data.folders);
  //     console.log(commerceSubdomains.data.folders);

  //     const allSubdomains = {};
  //     allSubdomains.folders = [...engineeringSubdomains.data.folders, ...artsSubdomains.data.folders, ...commerceSubdomains.data.folders];
  //     console.log(allSubdomains);

  //     setAll(allSubdomains);
  //   }
  //   fetchSubjects();
  // }, []);


  const dispatch = useDispatch();
  const productsListing = useSelector((state) => state.productList);
  const { products, loading, error } = productsListing;

  useEffect(() => {
    const fetchSubjects = async () => {
      switch (domain) {
        case "engineering":
          dispatch(listProducts("engineering"));
          break;
        case "arts":
          dispatch(listProducts("arts"));
          break;
        case "commerce":
          dispatch(listProducts("commerce"));
          break;
        default:
          break;
      }
    }
    fetchSubjects();
  }, [domain, dispatch]);

  return (
    <div className="product-listing-page">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ProductListingFilter
          all={all}
          setFiltered={setFiltered}
          activeSubdomain={activeSubdomain}
          setActiveSubdomain={setActiveSubdomain} />
        // {/* <motion.div
        //   layout
        //   className="all-subjects">
        //   <AnimatePresence>
        //     {filtered.map(movie => {
        //       return <ProductListingCard key={movie.id} movie={movie} />
        //     })}
        //   </AnimatePresence>
        // </motion.div> */}
      )}
    </div>

  );

}

export default ProductListingPage