require('dotenv').config();
require("./database/connectDBs");

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const mongoose = require('mongoose');
const { Domain, Subdomain, Subject } = require('../models/ProductsSchema');

// Fetch all subjects from cloudinary and 
// 1. if there are domains missing, then add them to the Domain Collection with a randomly generated id
// 2. if there are subdomains missing, then add them to the Subdomain Collection with a randomly generated id
// 3. if there are subjects missing, then add them to the Subject Collection with a randomly generated id
// 4. if there are extra domains, then delete them from the Domain Collection
// 5. if there are extra subdomains, then delete them from the Subdomain Collection
// 6. if there are extra subjects, then delete them from the Subject Collection

let finalDomains = [];
let finalSubdomains = [];
let finalSubjects = [];

const fetchAllDomainsFromCloudinaryAndAddToDatabase = async () => {

    const fetchAllDomainsFromCloudinaryAndAddToDatabaseTransaction = Sentry.startTransaction({
        op: "fetchAllDomainsFromCloudinaryAndAddToDatabase",
        name: "Fetch All Domains From Cloudinary And Add To Database",
        description: "Fetch all domains from cloudinary and add to database",
    });

    try {
        const domains = await cloudinary.api.sub_folders("noteups");
        const domainsInDatabase = await Domain.find({});

        // Check if there are domains missing in the database
        const domainsMissingInDatabase = domains.folders.filter(domain => {
            finalDomains.push(domain.name);
            return !domainsInDatabase.find(dbDomain => dbDomain.name === domain.name);
        });

        // Add domains missing in the database
        if (domainsMissingInDatabase.length > 0) {
            const domainsToAdd = domainsMissingInDatabase.map(domain => {
                return {
                    _id: new mongoose.Types.ObjectId(),
                    name: domain.name,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            });
            await Domain.insertMany(domainsToAdd);
        }

        // Check if there are extra domains in the database
        const extraDomainsInDatabase = domainsInDatabase.filter(dbDomain => {
            return !domains.folders.find(domain => domain.name === dbDomain.name);
        });

        // Delete extra domains in the database
        if (extraDomainsInDatabase.length > 0) {
            await Domain.deleteMany({ _id: { $in: extraDomainsInDatabase.map(domain => domain._id) } });
        }

        console.log(`finalDomains: `, finalDomains);

    } catch (error) {
        console.error(error);
        Sentry.captureException(error);
    } finally {
        fetchAllDomainsFromCloudinaryAndAddToDatabaseTransaction.finish();
    }
}

const fetchAllSubdomainsFromCloudinaryAndAddToDatabase = async () => {

    const fetchAllSubdomainsFromCloudinaryAndAddToDatabaseTransaction = Sentry.startTransaction({
        op: "fetchAllSubdomainsFromCloudinaryAndAddToDatabase",
        name: "Fetch All Subdomains From Cloudinary And Add To Database",
        description: "Fetch all subdomains from cloudinary and add to database",
    });

    try {
        const domains = await cloudinary.api.sub_folders("noteups");
        const subdomains = {}
        await Promise.all(domains.folders.map(async domain => {
            subdomains[domain.name] = await cloudinary.api.sub_folders(`noteups/${domain.name}`).then(subdomains => subdomains.folders);
        }));
        const subdomainsInDatabase = await Subdomain.find({});

        // Check if there are subdomains missing in the database
        const subdomainsMissingInDatabase = Object.keys(subdomains).map(domain => {
            return subdomains[domain].filter(subdomain => {
                finalSubdomains.push(subdomain.name);
                return !subdomainsInDatabase.find(dbSubdomain => dbSubdomain.name === subdomain.name);
            });
        });

        // Add subdomains missing in the database
        if (subdomainsMissingInDatabase.length > 0) {
            const subdomainsToAdd = subdomainsMissingInDatabase.map(subdomains => {
                return subdomains.map(subdomain => {
                    return {
                        _id: new mongoose.Types.ObjectId(),
                        name: subdomain.name,
                        domain: Domain.find({ name: subdomain.path.split('/')[1] })._id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };
                });
            });

            await Subdomain.insertMany(subdomainsToAdd.flat());
        }

        // Check if there are extra subdomains in the database
        const extraSubdomainsInDatabase = subdomainsInDatabase.filter(dbSubdomain => {
            return !finalSubdomains.find(subdomain => subdomain === dbSubdomain.name);
        });

        // Delete extra subdomains in the database
        if (extraSubdomainsInDatabase.length > 0) {
            await Subdomain.deleteMany({ _id: { $in: extraSubdomainsInDatabase.map(subdomain => subdomain._id) } });
        }

        // In case there are duplicate subdomains, delete them from the database
        // const duplicateSubdomainsInDatabase = subdomainsInDatabase.filter(dbSubdomain => {
        //   return finalSubdomains.find(subdomain => subdomain === dbSubdomain.name);
        // });

        // if (duplicateSubdomainsInDatabase.length > 0) {
        //   await Subdomain.deleteMany({ _id: { $in: duplicateSubdomainsInDatabase.map(subdomain => subdomain._id) } });
        // }

        console.log(`finalSubdomains:`, finalSubdomains);

    } catch (error) {
        console.error(error);
        Sentry.captureException(error);
    } finally {
        fetchAllSubdomainsFromCloudinaryAndAddToDatabaseTransaction.finish();
    }
}

const fetchAllSubjectsFromCloudinaryAndAddToDatabase = async () => {

    const fetchAllSubjectsFromCloudinaryAndAddToDatabaseTransaction = Sentry.startTransaction({
        op: "fetchAllSubjectsFromCloudinaryAndAddToDatabase",
        name: "Fetch All Subjects From Cloudinary And Add To Database",
        description: "Fetch all subjects from cloudinary and add to database",
    });


    try {
        const domains = await cloudinary.api.sub_folders("noteups");
        const subdomains = {}
        const subjects = {}

        await Promise.all(domains.folders.map(async domain => {
            subdomains[domain.name] = await cloudinary.api.sub_folders(`noteups/${domain.name}`).then(subdomains => subdomains.folders);
        }));

        await Promise.all(Object.keys(subdomains).map(async domain => {
            subjects[domain] = await Promise.all(subdomains[domain].map(async subdomain => {
                return await cloudinary.api.sub_folders(`noteups/${domain}/${subdomain.name}`).then(subjects => subjects.folders);
            }));
        }));

        const subjectsInDatabase = await Subject.find({});

        // Check if there are subjects missing in the database
        const subjectsMissingInDatabase = Object.keys(subjects).map(domain => {
            return subjects[domain].map(subjects => {
                return subjects.map(subject => {
                    finalSubjects.push(subject.name);
                    if (subjectsInDatabase.find(dbSubject => dbSubject.name === subject.name)) {
                        return false;
                    } else {
                        return subject;
                    }
                });
            });
        });

        // Add subjects missing in the database
        if (subjectsMissingInDatabase.length > 0) {
            const subjectsToAdd = subjectsMissingInDatabase.map(allDomainSubjects => {
                return allDomainSubjects.map(allSubdomainSubjects => {
                    return allSubdomainSubjects.map(subject => {
                        if (subject != false) {
                            return {
                                _id: new mongoose.Types.ObjectId(),
                                name: subject.name,
                                subdomain: Subdomain.find({ name: subject.path.split('/')[2] })._id,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            };
                        } else {
                            return false;
                        }
                    });
                });
            });


            subjectsToAdd.flat().map(allSubdomainSubjects => {
                allSubdomainSubjects.map(subject => {
                    if (subject != false) {
                        return Subject.insertMany(subject);
                    }
                });
            });
        }

        // Delete extra subjects in the database
        const extraSubjectsInDatabase = subjectsInDatabase.filter(dbSubject => {
            return !finalSubjects.find(subject => subject === dbSubject.name);
        });

        if (extraSubjectsInDatabase.length > 0) {
            await Subject.deleteMany({ _id: { $in: extraSubjectsInDatabase.map(subject => subject._id) } });
        }


        console.log(`finalSubjects:`, finalSubjects);
    } catch (error) {
        console.error(error);
        Sentry.captureException(error);
    } finally {
        fetchAllSubjectsFromCloudinaryAndAddToDatabaseTransaction.finish();
    }
}

// call the functions
fetchAllDomainsFromCloudinaryAndAddToDatabase();
fetchAllSubdomainsFromCloudinaryAndAddToDatabase();
fetchAllSubjectsFromCloudinaryAndAddToDatabase();