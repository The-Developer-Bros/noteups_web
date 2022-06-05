require("dotenv").config();

const express = require("express");
const router = express.Router();

const {
  listDomains,
  listSubdomains,
  listSubjects,
} = require("../controllers/MongoProductController");

router.get("/mongo/domains", listDomains);
router.get("/mongo/subdomains", listSubdomains);
router.get("/mongo/subjects", listSubjects);
// Export the router
module.exports = router;
