import React, { useEffect, useRef, useState } from "react";
import "./ProductDetailPage.scss";
import {
  fetchAsyncSubjectPDFs,
  getSelectedSubjectDetails,
  getSelectedSubjectPDFs,
  removeSelectedSubjectPDFs,
  removeSelectedSubjectDetails,
  fetchAsyncSubjectDetails,
} from "../../../redux/slices/SubdomainSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductDetailPage() {
  // Get full url of current page
  const url = window.location.href;
  const urlArray = url.split("/");

  const domain = String(urlArray[urlArray.length - 3]);
  const subdomain = String(urlArray[urlArray.length - 2]);
  const subject = String(urlArray[urlArray.length - 1]);

  const [response, setResponse] = useState({});
  const [subjectJsonData, setSubjectJsonData] = useState({});

  const dispatch = useDispatch();

  // const subjectPDfs = useSelector(getSelectedSubjectPDFs);
  const subjectDetails = useSelector(getSelectedSubjectDetails);

  // console.log("subjectPDfs", subjectPDfs);
  console.log("subjectDetails", subjectDetails.secure_url);

  useEffect(() => {
    try {
      // dispatch(fetchAsyncSubjectPDFs({domain, subdomain, subject}));
      dispatch(fetchAsyncSubjectDetails({ domain, subdomain, subject }));
      // return () => {
      //   // dispatch(removeSelectedSubjectPDFs());
      //   dispatch(removeSelectedSubjectDetails());
      // };

      // Open the Json details
      const openJson = async (subjectDetails) => {
        const subjectDetailsSecureUrl = await fetch(subjectDetails.secure_url);
        const subjectDetailsJson = await subjectDetailsSecureUrl.json();
        // console.log("Subject Json Data ", subjectJsonData);

        setResponse(subjectDetailsSecureUrl);
        setSubjectJsonData(subjectDetailsJson);

      };
      openJson(subjectDetails);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, domain, subdomain, subject]);

  return (
    <div className="subject-section">
      {Object.keys(subjectJsonData).length === 0 ? (
        <div className="subject-detail-error">
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          <div className="section-left">
            <div className="subject-title">{subjectJsonData.name}</div>
            <div className="subject-year">{subjectJsonData.Year}</div>
            <div className="subject-rating">
              <span>
                Rating: <i className="fa fa-star"></i> :{" "}
                {subjectJsonData.rating}
              </span>
              <span>
                Votes: <i className="fa fa-thumbs-up"></i> :{" "}
                {subjectJsonData.votes}
              </span>
            </div>
            <div className="subject-info">
              <div>
                <span>Domain</span>
                <span>{subjectJsonData.domain}</span>
              </div>
              <div>
                <span>Subdomain</span>
                <span>{subjectJsonData.subdomain}</span>
              </div>
            </div>
            <div className="subject-plot">{subjectJsonData.description}</div>
          </div>

          <div className="section-right">
            <div className="subject-poster">
              {/* <img src={subjectJsonData.poster} alt={data.Title} /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetailPage;
