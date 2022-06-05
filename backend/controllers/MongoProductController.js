require("dotenv").config();
require("./connectDBs");

const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { Domain, Subdomain, Subject } = require("../models/ProductModel");

const domains = Domain.find({});
const subdomains = Subdomain.find({});
const subjects = Subject.find({});

const listDomains = async () => {
  const domains = await Domain.find({});
  console.log(domains);
  return domains;
};

const listSubdomains = async () => {
  const subdomains = await Subdomain.find({});
  console.log(subdomains);
  return subdomains;
};

const listSubjects = async () => {
  const subjects = await Subject.find({});
  console.log(subjects);
  return subjects;
};

module.exports = {
    listDomains,
    listSubdomains,
    listSubjects,
}