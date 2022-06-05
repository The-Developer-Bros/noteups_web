const mongoose = require("mongoose");


// Heirarchy of Products
// Domains -> Subdomains -> Subjects(Products)

const DomainSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
});


const SubdomainSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    }
});

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    subdomain: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
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