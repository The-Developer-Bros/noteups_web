import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProductListingFilter({ setFiltered, all, activeSubdomain, setActiveSubdomain }) {

    // console.log(`all: ${all}`);
    console.log(all)
    console.log(`activeSubdomain: ${activeSubdomain}`);

    const dispatch = useDispatch();
    const subdomainListing = useSelector((state) => state.subdomainList);
    const { subdomains, loading, error } = subdomainListing;

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
        <div className="filter-container">
            {/* <button onClick={() => setActiveSubdomain("all")} className={activeSubdomain === "all" ? "active" : ""}>All</button> */}

            {
                loading ?
                    <div>Loading...</div>
                    :
                    error ?
                        <div>{error}</div>
                        :
                        (<div>
                            {
                                subdomains.map(subject => {
                                    return <button
                                        key={subject.path}
                                        onClick={() => setActiveSubdomain(subject.path.split('/')[1])}
                                        className={activeSubdomain === subject.path.split('/')[1] ? "active" : ""}>
                                        {subject.name}</button>
                                })

                            }
                        </div>)
            }
        </div>
    )
}


export default ProductListingFilter
{/* <button onClick={() => setActiveSubdomain("computer-science-and-it")} className={activeSubdomain === "action" ? "active" : ""}>Computer Science and IT</button> */ }