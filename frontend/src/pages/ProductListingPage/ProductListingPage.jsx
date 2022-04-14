import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSubdomainsActionCreater, listSubjectsActionCreator } from '../../redux/actions/ProductActions';
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
      dispatch(listSubjectsActionCreator(domain, subdomain));
    }

    fetchSubdomains();
    fetchSubjects();

  }, [dispatch, domain, subdomain, subdomainAvailable]);

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
        <div>
          {
            Object.keys(filtered).map((key) => {
              return <h1 key={key}>{filtered[key].name}</h1>
            })
          }
        </div>
      )}
    </div>
  );

}

export default ProductListingPage

// <motion.div
//   layout
//   className="all-subjects">
//   <AnimatePresence>
//     {subjects.map(subject => {
//       return <ProductListingCard key={subject.path} subject={subject} />
//     })}
//   </AnimatePresence>
// </motion.div>