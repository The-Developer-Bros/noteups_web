import React, { useEffect } from 'react'

function ProductListingFilter({ setFiltered, all, activeSubdomain, setActiveSubdomain }) {

    // console.log(`all: ${all}`);
    console.log(all)
    console.log(`activeSubdomain: ${activeSubdomain}`);

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
            <button onClick={() => setActiveSubdomain("all")} className={activeSubdomain === "all" ? "active" : ""}>All</button>
            {/* <button onClick={() => setActiveSubdomain(28)} className={activeSubdomain === 28 ? "active" : ""}>Action</button>
            <button onClick={() => setActiveSubdomain(12)} className={activeSubdomain === 12 ? "active" : ""}>Adventure</button>
            <button onClick={() => setActiveSubdomain(16)} className={activeSubdomain === 16 ? "active" : ""}>Animation</button> */}

            <button onClick={() => setActiveSubdomain("computer-science-and-it")} className={activeSubdomain === "action" ? "active" : ""}>Computer Science and IT</button>




        </div>
    )
}

export default ProductListingFilter