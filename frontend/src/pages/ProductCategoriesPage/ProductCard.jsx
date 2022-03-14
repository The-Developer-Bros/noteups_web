import React from 'react';
import "./ProductCard.css";

const ProductCard = (props) => {

    const { data } = props;
    console.log("data is", data);

    return (
        <div className="card-item">
            {/* <Link to={`/movie/${data.imdbID}`}> */}
            <div className="card-inner">
                <div className="card-top">
                    <img src={data.Poster} alt="movie-poster" />
                </div>
                <div className="card-bottom">
                    <div className="card-info">
                        <h4>{data.name}</h4>
                        <p>{data.path}</p>
                    </div>
                </div>
            </div>
            {/* </Link> */}
        </div>
    )
}

export default ProductCard