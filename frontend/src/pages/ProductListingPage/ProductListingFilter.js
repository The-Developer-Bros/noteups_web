import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProductListingFilter({ setFiltered, all, activeSubdomain, setActiveSubdomain }) {

    const subdomainListing = useSelector((state) => state.subdomainList);
    const { subdomains, loading: loadingSubdomain, error : errorSubdomain} = subdomainListing;

    useEffect(() => {

        if (activeSubdomain === "all") {
            setFiltered(all);
        } else {

            // Filter the the all object based on subject.path matching activesubdomain
            let allClone = Object.fromEntries(Object.entries(all).filter(([key, value]) => {
                console.log(`key: ${key} and value: ${value}`);
                return value.path.split('/')[2] === (activeSubdomain);
            }));

            console.log(`allClone:`, { allClone });
            setFiltered(allClone);
        }
    }, [activeSubdomain, all, setFiltered]);


    return (
        <div className="filter-container">
            {/* <button onClick={() => setActiveSubdomain("all")} className={activeSubdomain === "all" ? "active" : ""}>All</button> */}
            {
                loadingSubdomain ?
                    <div>Loading...</div>
                    :
                    errorSubdomain ?
                        <div>{errorSubdomain}</div>
                        :
                        (<div>
                            {
                                subdomains.map(subject => {
                                    return <button
                                        key={subject.path}
                                        onClick={() => setActiveSubdomain(String(subject.path.split('/')[2]))}
                                        className={activeSubdomain === subject.path.split('/')[2] ? "active" : ""}>
                                        {subject.name}</button>
                                })

                            }
                        </div>)
            }
        </div>
    )
}


export default ProductListingFilter