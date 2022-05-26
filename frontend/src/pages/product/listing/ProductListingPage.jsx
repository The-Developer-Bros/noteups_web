import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSubdomainsActionCreater, listSubjectsActionCreator } from '../../../redux/actions/ProductActions';
import ProductListingCard from './ProductListingCard';
import ProductListingFilter from './ProductListingFilter';
import "./ProductListingPage.scss";

function ProductListingPage() {

  const [all, setAll] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeSubdomain, setActiveSubdomain] = useState(String("all"));

  const url = window.location.href;
  const urlArray = url.split("/");

  let subdomainAvailable = (urlArray.length === 6);

  let domain = "";
  let subdomain = "";

  if (subdomainAvailable) {
    domain = urlArray[urlArray.length - 2];
    subdomain = urlArray[urlArray.length - 1];
  } else {
    domain = urlArray[urlArray.length - 1];
    subdomain = "all";
  }

  const dispatch = useDispatch();

  const subdomainListing = useSelector((state) => state.subdomainList);
  const { subdomains, loading: loadingSubdomains, error: errorSubdomains } = subdomainListing;

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
      dispatch(listSubjectsActionCreator(domain, "all"));
    }

    fetchSubdomains();
    fetchSubjects();

  }, [dispatch, domain]);

  // When the loading of subdomains is complete, set the state of all and filtered
  useEffect(() => {
    if (!loadingSubject && !errorSubject) {
      setAll(subjects);
      setFiltered(subjects);
    }
  }, [loadingSubject, errorSubject, subjects]);


  return (
    <div className="product-listing-page">
      {loadingSubdomains ? (
        <div>Loading...</div>
      ) : errorSubdomains ? (
        <div>{errorSubdomains}</div>
      ) : (
        <ProductListingFilter
          all={all}
          setFiltered={setFiltered}
          activeSubdomain={activeSubdomain}
          setActiveSubdomain={setActiveSubdomain} />
      )}



      {loadingSubject ? (
        <div>Loading...</div>
      ) : errorSubject ? (
        <div>{errorSubject}</div>
      ) : (

        <motion.div
          layout
          className="product-listing-page-cards"
        >
          <AnimatePresence>
            {Object.keys(filtered).map((key) => {
              return <ProductListingCard key={key} subject={filtered[key]} />
            })}
          </AnimatePresence>
        </motion.div>

      )}
    </div>
  );

}

export default ProductListingPage