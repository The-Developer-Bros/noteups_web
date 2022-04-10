import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncArtsSubjects, fetchAsyncCommerceSubjects, fetchAsyncEngineeringSubjects } from '../../redux/subjects/SubjectSlice';
import "./ProductListingPage.scss";

function ProductListingPage() {

  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeSubject, setActiveSubject] = useState(0);

  const url = window.location.href;
  const urlArray = url.split("/");

  const domain = urlArray[urlArray.length - 2];
  const subdomain = urlArray[urlArray.length - 1];


  useEffect(() => {
    const fetchSubjects = async () => {
      switch (domain) {
        case "engineering":
          const data = fetchAsyncEngineeringSubjects();
          setPopular(data);
          break;
        case "arts":
          const data2 = fetchAsyncArtsSubjects();
          setPopular(data2);
          break;
        case "commerce":
          const data3 = fetchAsyncCommerceSubjects();
          setPopular(data3);
          break;
        default:
          break;
      }
    }
    fetchSubjects();
  }, [domain]);

  return (
    <div className="App">
      <Filter popular={popular} setFiltered={setFiltered} activeSubject={activeSubject} setActiveSubject={setActiveSubject} />
      <motion.div
        layout
        className="popular-subjects">
        <AnimatePresence>
          {filtered.map(movie => {
            return <Movie key={movie.id} movie={movie} />
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ProductListingPage