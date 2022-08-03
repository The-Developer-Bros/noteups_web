require("dotenv").config();

const express = require("express");
const router = express.Router();

const {
  listDomains,
  listSubdomains,
  listSubjects,
  listUserSubscriptions,
} = require("../controllers/MongoProductController");

router.get("/domains", listDomains);
router.get("/subdomains", listSubdomains);
router.get("/subjects", listSubjects);
router.get("/subscriptions", listUserSubscriptions);

// Export the router
module.exports = router;
