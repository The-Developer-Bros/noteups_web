import React from 'react';
import "./ProductDetailPage.scss";

function ProductDetailPage() {

  // Get full url of current page
  const url = window.location.href;
  const urlArray = url.split("/");
  console.log(urlArray);


  return (
    <div>ProductDetailPage

      <div>
        <h1>{urlArray[urlArray.length - 1]}</h1>
        <h2>{urlArray[urlArray.length - 2]}</h2>
        <h3>{urlArray[urlArray.length - 3]}</h3>
      </div>

    </div>
  )
}

export default ProductDetailPage