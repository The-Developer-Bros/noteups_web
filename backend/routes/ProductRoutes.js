require("dotenv").config();

const express = require("express");
const router = express.Router();

const {
  getAllDomains,
  getAllSubdomainsForDomain,
  getAllSubjectsForSubdomain,
  getAllPDFsForSubject,
  downloadSubject,
  uploadSubject,
} = require("../controllers/ProductController");

router.get("/domains", getAllDomains);
router.get("/:domain/subdomains", getAllSubdomainsForDomain);
router.get("/:domain/:subdomain/subjects", getAllSubjectsForSubdomain);

router.get("/:domain/:subdomain/:subject", getAllPDFsForSubject);
router.get("/download/:domain/:subdomain/:subject", downloadSubject);
router.post("/upload/:domain/:subdomain/:subject", uploadSubject);

// Export the router
module.exports = router;
