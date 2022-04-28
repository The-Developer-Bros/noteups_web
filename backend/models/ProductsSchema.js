const mongoose = require("mongoose");


// Heirarchy of Products
// Domains -> Subdomains -> Subjects(Products)

const DomainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});


const SubdomainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Domain"
    }
});

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subdomain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subdomain"
    },
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Domain"
    },
    pdfUrl: {
        type: String
    },
    usersPurchased: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
});

module.exports = {
    Domain: mongoose.model("Domain", DomainSchema),
    Subdomain: mongoose.model("Subdomain", SubdomainSchema),
    Subject: mongoose.model("Subject", SubjectSchema)
}