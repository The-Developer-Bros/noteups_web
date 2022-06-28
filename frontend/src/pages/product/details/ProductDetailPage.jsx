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

  const dispatch = useDispatch();

  const subjectDetails = useSelector(getSelectedSubjectDetails);
  const subjectImages = useSelector(getSelectedSubjectImages);
  // const subjectPDfs = useSelector(getSelectedSubjectPDFs);

  console.log("subjectDetails", subjectDetails);
  console.log("subjectImages", subjectImages);
  // console.log("subjectPDfs", subjectPDfs);

  useEffect(() => {
    try {
      dispatch(fetchAsyncSubjectDetails({ domain, subdomain, subject }));
      dispatch(fetchAsyncSubjectsImages({ domain, subdomain, subject }));
      // dispatch(fetchAsyncSubjectPDFs({domain, subdomain, subject}));

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
      {subjectDetails && subjectDetails.subject_meta_data ? (
        <>
          <div className="section-left">
            <div className="subject-title">
              {subjectDetails.subject_meta_data.name}
            </div>
            <div className="subject-year">
              {subjectDetails.subject_meta_data.Year}
            </div>
            <div className="subject-rating">
              <span>
                Rating: <i className="fa fa-star"></i> :{" "}
                {subjectDetails.subject_meta_data.rating}
              </span>
              <span>
                Votes: <i className="fa fa-thumbs-up"></i> :{" "}
                {subjectDetails.subject_meta_data.votes}
              </span>
            </div>
            <div className="subject-info">
              <div>
                <span>Domain </span>
                <span>{subjectDetails.subject_meta_data.domain}</span>
              </div>
              <div>
                <span>Subdomain </span>
                <span>{subjectDetails.subject_meta_data.subdomain}</span>
              </div>
            </div>
            <div className="subject-description">
              {subjectDetails.subject_meta_data.description}
            </div>
          </div>

          <div className="section-right">
            <div className="subject-poster">
              <img
                src={subjectImages[0].secure_url}
                alt="poster"
                className="subject-poster-img"
              />
            </div>
            <div className="subject-interact-buttons">
              {!itemInCart && (
                <button
                  className="button is-black nomad-btn"
                  onClick={() => {
                    console.log(
                      "addproduct ",
                      subjectDetails.subject_meta_data
                    );
                    dispatch(addProduct(subjectDetails));
                  }}
                >
                  ADD TO CART
                </button>
              )}
              {itemInCart && (
                <button
                  className="button is-white nomad-btn"
                  id="btn-white-outline"
                  onClick={() => {
                    console.log("increase ", subjectDetails.subject_meta_data);
                    dispatch(increase(subjectDetails));
                  }}
                >
                  ADD MORE
                </button>
              )}

              {/* Go to pdf viewer button */}
              <button
                className="button subject-pdf-viewer is-black nomad-btn"
                onClick={() => {
                  window.open(subjectDetails.subject_meta_data.pdf_url);
                }}
              >
                PDF VIEWER
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="subject-detail-error">
          <h3>Loading...</h3>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
