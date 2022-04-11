import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSubdomainsActionCreater, detailsSubdomainAction, listSubjectsActionCreator } from '../../redux/actions/ProductActions';
import ProductListingFilter from './ProductListingFilter';
import "./ProductListingPage.scss";

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

  const subdomainListing = useSelector((state) => state.subdomainList);
  const { products, loading, error } = subdomainListing;

  const subjectListing = useSelector((state) => state.subjectList);
  const { subjects, loading: loadingSubject, error: errorSubject } = subjectListing;

  useEffect(() => {
    const fetchSubdomains = async () => {
      switch (domain) {
        case "engineering":
          dispatch(listSubdomainsActionCreater("engineering"));
          break;
        case "arts":
          dispatch(listSubdomainsActionCreater("arts"));
          break;
        case "commerce":
          dispatch(listSubdomainsActionCreater("commerce"));
          break;
        default:
          break;
      }
    }

    const fetchSubjects = async () => {
      dispatch(listSubjectsActionCreator(domain, subdomain));
    }
    fetchSubdomains();
    fetchSubjects();
  }, [domain, dispatch, subdomain]);
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
        // <motion.div
        //   layout
        //   className="all-subjects">
        //   <AnimatePresence>
        //     {filtered.map(movie => {
        //       return <ProductListingCard key={movie.id} movie={movie} />
        //     })}
        //   </AnimatePresence>
        // </motion.div>

      )}
      {loadingSubject ? (
        <div>Loading...</div>
      ) : errorSubject ? (
        <div>{errorSubject}</div>
      ) : (
        <div className="all-subjects">
          {subjects.map(subject => {
            return <h1 key={subject.path}>{subject.name}</h1>
          })}
        </div>
      )}
    </div>
  );



}

export default ProductListingPage
