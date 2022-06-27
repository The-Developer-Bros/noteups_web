import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { convertToSentenceCase } from "../../../utils";

function ProductListingFilter({
  setFiltered,
  all,
  activeSubdomain,
  setActiveSubdomain,
}) {
  const subdomainListing = useSelector((state) => state.subdomainList);
  const {
    subdomains,
    loading: loadingSubdomain,
    error: errorSubdomain,
  } = subdomainListing;

  const filterSubjectsBasedOnSubdomain = (all, activeSubdomain) => {
    let allClone = Object.fromEntries(
      Object.entries(all).filter(([key, value]) => {
        console.log(`key: ${key} and value: ${value}`);
        return value.path.split("/")[2] === activeSubdomain;
      })
    );
    return allClone;
  };

  useEffect(() => {
    if (activeSubdomain === "all") {
      setFiltered(all);
    } else {
      // Filter the the all object based on subject.path matching activesubdomain
      let allClone = filterSubjectsBasedOnSubdomain(all, activeSubdomain);
      console.log(`allClone:`, { allClone });
      setFiltered(allClone);
    }
  }, [activeSubdomain, all, setFiltered]);

  return (
    <div className="filter-container">
      {loadingSubdomain ? (
        <div>Loading...</div>
      ) : errorSubdomain ? (
        <div>{errorSubdomain}</div>
      ) : (
        <div>
          <button
            onClick={() => setActiveSubdomain("all")}
            className={activeSubdomain === "all" ? "active" : ""}
          >
            All
          </button>
          {subdomains.map((subject) => {
            return (
              <button
                key={subject.path}
                onClick={() => {
                  // change url to match subdomain
                  // window.location.href = `${window.location.origin}/products/${
                  //   subject.path.split("noteups/")[1]
                  // }`;
                  window.history.replaceState(
                    {},
                    "",
                    `${window.location.origin}/products/${
                      subject.path.split("noteups/")[1]
                    }`
                  );

                  setActiveSubdomain(String(subject.path.split("/")[2]));
                }}
                className={
                  activeSubdomain === subject.path.split("/")[2] ? "active" : ""
                }
              >
                {convertToSentenceCase(subject.name)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductListingFilter;
