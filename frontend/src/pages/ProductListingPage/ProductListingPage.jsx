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
  const [activeSubdomain, setActiveSubdomain] = useState("all");

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
  const { subdomains, loadingSubdomains, errorSubdomains } = subdomainListing;

  const subjectListing = useSelector((state) => state.subjectList);
  const { subjects, loadingSubject, errorSubject } = subjectListing;

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
  
  useEffect(() => {

    if (activeSubdomain === "all") {
      setFiltered(all);
    } else {
      const allClone = JSON.parse(JSON.stringify(all));
      allClone.folders = all.folders.filter(subject => {
        return subject.path.split('/')[1] === activeSubdomain;
      });
      setFiltered(allClone);
    }
  }, [activeSubdomain, all, setFiltered]);


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

      {/* <motion.div
        layout
        className="all-subjects">
        <AnimatePresence>
          {filtered.map(movie => {
            return <ProductListingCard key={movie.id} movie={movie} />
          })}
        </AnimatePresence>
      </motion.div> */}


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
        // <motion.div
        //   layout
        //   className="all-subjects">
        //   <AnimatePresence>
        //     {subjects.map(subject => {
        //       return <ProductListingCard key={subject.path} subject={subject} />
        //     })}
        //   </AnimatePresence>
        // </motion.div>
      )}
    </div>
  );



}

export default ProductListingPage
