import React from 'react';
import { Link } from 'react-router-dom';
import { convertToSentenceCase } from '../../../utils';
import "./ProductCard.scss";


const ProductCard = (props) => {

    const { data } = props;
    console.log("product card data is", data);

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