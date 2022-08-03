import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addProduct,
  increase,
  isInCart,
} from "../../../redux/slices/CartSlice";
import {
  fetchAsyncSubjectDetails,
  fetchAsyncSubjectsImages,
  getSelectedSubjectDetails,
  getSelectedSubjectImages,
  removeSelectedSubjectDetails,
} from "../../../redux/slices/SubdomainSlice";
import "./ProductDetailPage.scss";

import Toggle from "react-toggle";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { backendClient } from "../../../common/clients";
import { convertToSentenceCase } from "../../../utils";

import CheckoutButton from "../../../components/checkoutbutton/CheckoutButton";
import CardIcon from "./images/credit-card.svg";

// Products to Price Map
const productToPriceMap = {
  STANDARD_MONTHLY: "price_1LQCpqSGWHUvUtAi9n0j6Xt5",
  STANDARD_YEARLY: "price_1LQCpqSGWHUvUtAi60J6KlBg",
  PREMIUM_MONTHLY: "price_1LQCr3SGWHUvUtAiV6n3r8RQ",
  PREMIUM_YEARLY: "price_1LQCr3SGWHUvUtAig9Xqp9wB",
};

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

  /////////////////////////////////// SUBJECT DETAILS ///////////////////////////////////////////
  const subjectDetails = useSelector(getSelectedSubjectDetails);
  const subjectImages = useSelector(getSelectedSubjectImages);
  // const subjectPDfs = useSelector(getSelectedSubjectPDFs);

  console.log("subjectDetails", subjectDetails);
  console.log("subjectImages", subjectImages);
  // console.log("subjectPDfs", subjectPDfs);

  const [packageType, setPackageType] = useState("standard");
  const [billingCycle, setBillingCycle] = useState("monthly");

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

  /////////////////////////////////// CART DETAILS ///////////////////////////////////////////

  // If the product in the cart/mongoDB has standard pricing
  // the user cannot add the premium pricing to the cart

  // If the product in the cart/mongoDB has premium pricing
  // the user cannot add the standard pricing to the cart

  // If the product in the cart/mongoDB has monthly pricing
  // the user cannot add the yearly pricing to the cart

  // If the product in the cart/mongoDB has yearly pricing
  // the user cannot add the monthly pricing to the cart

  const cartItems = useSelector((state) => state.cart.cartItems);
  // const itemInCart = isInCart(subjectDetails, cartItems);

  const itemInCart = isInCart(cartItems, {
    subjectDetails: subjectDetails,
    packageType: packageType,
    billingCycle: billingCycle,
  });

  console.log("cartItems", cartItems);
  console.log("itemInCart", itemInCart);

  useEffect(() => {
    const fetchStripePriceList = async () => {
      const res = await backendClient.get(`/stripeApi/prices`);
      const prices = res.data;
      console.log("prices", prices);
    };
    fetchStripePriceList();
  }, []);

  const packageTypeToggler = () => {
    if (packageType === "standard") {
      setPackageType("premium");
    } else {
      setPackageType("standard");
    }
  };

  const billingCycleToggler = () => {
    if (billingCycle === "monthly") {
      setBillingCycle("yearly");
    } else {
      setBillingCycle("monthly");
    }
  };

  const determineProductStripeId = (packageType, billingCycle) => {
    if (packageType === "standard") {
      if (billingCycle === "monthly") {
        return productToPriceMap.STANDARD_MONTHLY;
      } else {
        return productToPriceMap.STANDARD_YEARLY;
      }
    } else {
      if (billingCycle === "monthly") {
        return productToPriceMap.PREMIUM_MONTHLY;
      } else {
        return productToPriceMap.PREMIUM_YEARLY;
      }
    }
  };

  /////////////////////////////////// REACT COMPONENT ///////////////////////////////////////////

  return (
    <div className="subject-section">
      {subjectDetails && subjectDetails.subject_meta_data ? (
        <>
          <div className="section-left">
            <div className="subject-title">
              {convertToSentenceCase(subjectDetails.subject_meta_data.subject)}
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
                <span>
                  {convertToSentenceCase(
                    subjectDetails.subject_meta_data.domain
                  )}
                </span>
              </div>
              <div>
                <span>Subdomain </span>
                <span>
                  {convertToSentenceCase(
                    subjectDetails.subject_meta_data.subdomain
                  )}
                </span>
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
              {/* Select Package and Billing Cycle */}
              <div className="subject-package-select">
                Select Package
                <Toggle onClick={packageTypeToggler} />
                <span>{packageType}</span>
              </div>

              <div className="subject-billing-cycle-select">
                Select Billing Cycle
                <Toggle onClick={billingCycleToggler} />
                <span>{billingCycle}</span>
              </div>

              {itemInCart.message === "Item not in cart" && (
                <CheckoutButton
                  className="checkout-button"
                  onClick={() => {
                    console.log(
                      "addproduct ",
                      subjectDetails.subject_meta_data
                    );
                    try {
                      dispatch(
                        addProduct({
                          subjectDetails: subjectDetails,
                          packageType: packageType,
                          billingCycle: billingCycle,
                          productStripeId: determineProductStripeId(
                            packageType,
                            billingCycle
                          ),
                        })
                      );
                      toast.success("Product added to cart");
                    } catch (err) {
                      console.log(err);
                      toast.error("Error adding product to cart");
                    }
                  }}
                  text="ADD TO CART"
                  imgSrc={CardIcon}
                />
              )}
              {itemInCart.message === "Item already in cart" && (
                <CheckoutButton
                  onClick={() => {
                    console.log("increase ", subjectDetails.subject_meta_data);
                    try {
                      dispatch(
                        increase({
                          subjectDetails: subjectDetails,
                          packageType: packageType,
                          billingCycle: billingCycle,
                          productStripeId: determineProductStripeId(
                            packageType,
                            billingCycle
                          ),
                        })
                      );
                      toast.success("Product quantity increased");
                    } catch (err) {
                      console.log(err);
                      toast.error("Error increasing product quantity");
                    }
                  }}
                  text="ADD MORE"
                  imgSrc={CardIcon}
                />
              )}

              {itemInCart.message !== "Item not in cart" &&
                itemInCart.message !== "Item already in cart" && (
                  <span className="subject-in-cart">
                    <i className="fa fa-shopping-cart" />
                    <span>{itemInCart.message}</span>
                  </span>
                )}

              {/* Go to pdf viewer button */}
              <CheckoutButton
                onClick={() => {
                  window.open(subjectDetails.subject_meta_data.pdf_url);
                }}
                text="VIEW PDF"
                imgSrc={CardIcon}
              />
            </div>
          </div>
          <ToastContainer />
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
