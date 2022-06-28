require("dotenv").config();

const express = require("express");
const router = express.Router();

const {
  getAllDomains,
  getAllSubdomainsForDomain,
  getAllSubjectsForSubdomain,
  getAllPDFsForSubject,
  getSubjectPDFs,
  getSubjectDetails,
  getSubjectEverything,
  uploadSubject,
  getSubjectImages,
} = require("../controllers/CloudinaryProductController");

router.get("/domains", getAllDomains);
router.get("/:domain/subdomains", getAllSubdomainsForDomain);
router.get("/:domain/:subdomain/subjects", getAllSubjectsForSubdomain);

router.get("/:domain/:subdomain/:subject", getAllPDFsForSubject);

router.get("/details/:domain/:subdomain/:subject", getSubjectDetails);
router.get("/images/:domain/:subdomain/:subject", getSubjectImages);
router.get("/pdfs/:domain/:subdomain/:subject", getSubjectPDFs);
router.get("/everything/:domain/:subdomain/:subject", getSubjectEverything);

router.post("/upload/:domain/:subdomain/:subject", uploadSubject);

// Export the router
module.exports = router;
