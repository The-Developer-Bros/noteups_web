import React from 'react';
import { Link } from 'react-router-dom';
import "./ProductCard.scss";


const ProductCard = (props) => {

    const { data } = props;
    console.log("data is", data);

    // Convert dashed casing to Sentence Casing
    // "electrical-and-electronics" to "Electrical and Electronics"
    const convertToSentenceCase = (str) => {
        return str.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    const subdomainName = convertToSentenceCase(data.name);
    const pathArray = data.path.split("/");

    return (
        <div className="card-item">
            <Link to={`/products/${pathArray[pathArray.length - 2]}/${pathArray[pathArray.length - 1]}`}>
            <div className="card-inner">
                <div className="card-top">
                    <img src={data.poster} alt="movie-poster" />
                </div>
                <div className="card-bottom">
                    <div className="card-info">
                        <h3>{subdomainName}</h3>
                        <p>{data.path}</p>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default ProductCard