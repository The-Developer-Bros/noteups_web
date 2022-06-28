import React, { useEffect, useRef, useState } from "react";
import "./ProductDetailPage.scss";
import {
  fetchAsyncSubjectPDFs,
  getSelectedSubjectDetails,
  getSelectedSubjectPDFs,
  removeSelectedSubjectPDFs,
  removeSelectedSubjectDetails,
  fetchAsyncSubjectDetails,
  fetchAsyncSubjectsImages,
  getSelectedSubjectImages,
} from "../../../redux/slices/SubdomainSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addProduct,
  increase,
  decrease,
  removeProduct,
  clearCart,
  isInCart,
} from "../../../redux/slices/CartSlice";
function ProductDetailPage() {
  // Clear cache

  // Get full url of current page
  // const url = window.location.href;
  // const urlArray = url.split("/");

  // const domain = String(urlArray[urlArray.length - 3]);
  // const subdomain = String(urlArray[urlArray.length - 2]);
  // const subject = String(urlArray[urlArray.length - 1]);

  const { domain, subdomain, subject } = useParams();
  console.log(domain, subdomain, subject);

  const [response, setResponse] = useState({});
  const [subjectDetailsJsonData, setSubjectDetailsJsonData] = useState({});
  const [subjectImagesJsonData, setSubjectImagesJsonData] = useState([]);

  const dispatch = useDispatch();

  // const subjectPDfs = useSelector(getSelectedSubjectPDFs);
  const subjectDetails = useSelector(getSelectedSubjectDetails);
  const subjectImages = useSelector(getSelectedSubjectImages);

  // console.log("subjectPDfs", subjectPDfs);
  console.log("subjectDetails", subjectDetails);

  useEffect(() => {
    try {
      // dispatch(fetchAsyncSubjectPDFs({domain, subdomain, subject}));
      dispatch(fetchAsyncSubjectDetails({ domain, subdomain, subject }));
      dispatch(fetchAsyncSubjectsImages({ domain, subdomain, subject }));

      // Open the Json details
      const openJson = async (subjectDetails) => {
        const subjectDetailsSecureUrl = await fetch(subjectDetails.secure_url);
        const subjectDetailsJson = await subjectDetailsSecureUrl.json();
        // console.log("Subject Json Data ", subjectDetailsJsonData);

        // const subjectImagesSecureUrl = await fetch(subjectImages[0].secure_url);
        // const subjectImagesJson = await subjectImagesSecureUrl.json();

        setResponse(subjectDetailsSecureUrl);
        setSubjectDetailsJsonData(subjectDetailsJson);
        // setSubjectImagesJsonData(subjectImagesJson);
      };
      openJson(subjectDetails);
      setSubjectImagesJsonData(subjectImages[0]);

      return () => {
        // dispatch(removeSelectedSubjectPDFs());
        dispatch(removeSelectedSubjectDetails());
      };
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, domain, subdomain, subject]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemInCart = isInCart(subjectDetails, cartItems);
  console.log("cartItems", cartItems);
  console.log("itemInCart", itemInCart);

  return (
    <div className="subject-section">
      {Object.keys(subjectDetailsJsonData).length === 0 ? (
        <div className="subject-detail-error">
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          <div className="section-left">
            <div className="subject-title">{subjectDetailsJsonData.name}</div>
            <div className="subject-year">{subjectDetailsJsonData.Year}</div>
            <div className="subject-rating">
              <span>
                Rating: <i className="fa fa-star"></i> :{" "}
                {subjectDetailsJsonData.rating}
              </span>
              <span>
                Votes: <i className="fa fa-thumbs-up"></i> :{" "}
                {subjectDetailsJsonData.votes}
              </span>
            </div>
            <div className="subject-info">
              <div>
                <span>Domain </span>
                <span>{subjectDetailsJsonData.domain}</span>
              </div>
              <div>
                <span>Subdomain </span>
                <span>{subjectDetailsJsonData.subdomain}</span>
              </div>
            </div>
            <div className="subject-description">
              {subjectDetailsJsonData.description}
            </div>
          </div>

          <div className="section-right">
            <div className="subject-poster">
              <img
                src={subjectImagesJsonData.secure_url}
                alt="poster"
                className="subject-poster-img"
              />
            </div>
            <div className="subject-interact-buttons">
              {!itemInCart && (
                <button
                  className="button is-black nomad-btn"
                  onClick={() => dispatch(addProduct(subjectDetails))}
                >
                  ADD TO CART
                </button>
              )}
              {itemInCart && (
                <button
                  className="button is-white nomad-btn"
                  id="btn-white-outline"
                  onClick={() => dispatch(increase(subjectDetails))}
                >
                  ADD MORE
                </button>
              )}

              {/* Go to pdf viewer button */}
              <button
                className="button subject-pdf-viewer is-black nomad-btn"
                onClick={() => {
                  window.open(subjectDetailsJsonData.pdf_url);
                }}
              >
                PDF VIEWER
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetailPage;
