import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { convertToSentenceCase } from "../../../utils";

const ProductListingCard = ({ domain, subdomain, subject }) => {
  console.log(`subject:`, subject);
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        // Use dynamic routing to get the url from the subject.path
        // console.log(`subject.path:`, subject.path);
        window.location.href = `${window.location.origin}/products/${
          subject.path.split("noteups/")[1]
        }`;
      }}
    >
      <h1>{convertToSentenceCase(subject.name)}</h1>
      {/* remove /v1 from poster */}
      <img src={subject.poster} alt={subject.name} />
    </motion.div>
  );
};

export default ProductListingCard;
