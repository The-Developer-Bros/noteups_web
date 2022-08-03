const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { Domain, Subdomain, Subject } = require("../models/ProductModel");
const { User } = require("../models/UserModel");

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

const listUserSubscriptions = async () => {
  try {
    const users = await User.find({});
    // console.log(users);
    const userSubscriptions = [];
    users.forEach((user) => {
      userSubscriptions.push({
        user: user.name,
        subscriptions: user.subscriptions,
      });
    });
    console.log(userSubscriptions);
    return userSubscriptions;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  listDomains,
  listSubdomains,
  listSubjects,

  listUserSubscriptions,
};
