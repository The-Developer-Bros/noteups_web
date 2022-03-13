import React, { useState, useEffect } from "react";

// File heirarchy:
// domain/subdomain/subject/example.pdf

// {
//     "folders": [
//       {
//         "name": "arts",
//         "path": "noteups/arts"
//       },
//       {
//         "name": "commerce",
//         "path": "noteups/commerce"
//       },
//       {
//         "name": "engineering",
//         "path": "noteups/engineering"
//       }
//     ],
//     "next_cursor": null,
//     "total_count": 3,
//     "rate_limit_allowed": 500,
//     "rate_limit_reset_at": "2022-03-13T22:00:00.000Z",
//     "rate_limit_remaining": 471
//   }

function ContributePage() {
    const [domains, setDomains] = useState([]);
    const [domainId, setDomainId] = useState('');

    const [subdomains, setSubdomains] = useState([]);
    const [subdomainId, setSubdomainId] = useState('');

    const [subjects, setSubjects] = useState([]);
    const [subjectId, setSubjectId] = useState('');

    useEffect(() => {
        const getDomains = async () => {
            // const req = await fetch("http://localhost/devopsdeveloper/country");
            const req = await fetch("/api/domains");
            const res = await req.json();
            console.log(res.folders);

            // for each folder in the response, add it to the domains array
            const domains = res.folders?.map(folder => {
                return {
                    name: folder.name,
                    path: folder.path
                };
            });

            setDomains(domains);
            console.log(`domains: ${domains}`);
        };
        getDomains();
    }, []);


    useEffect(() => {
        const getSubdomains = async () => {
            const req = await fetch(`/api/${domainId}/subdomains`);
            const res = await req.json();

            // for each folder in the response, add it to the subdomains array
            const subdomains = res.folders?.map(folder => {
                return {
                    name: folder.name,
                    path: folder.path
                };
            });

            setSubdomains(subdomains);
            console.log(`subdomains: ${subdomains}`);
        }
        getSubdomains();
    }, [domainId]);



    useEffect(() => {

        const getSubjects = async () => {
            const req = await fetch(`/api/${domainId}/${subdomainId}/subjects`);
            const res = await req.json();

            // for each folder in the response, add it to the subjects array
            const subjects = res.folders?.map(folder => {
                return {
                    name: folder.name,
                    path: folder.path
                };
            });

            setSubjects(subjects);
            console.log(`subjects: ${subjects}`);
        }
        getSubjects();
    }, [domainId, subdomainId]);

    const handleDomain = (event) => {
        const getDomainId = event.target.value;
        setDomainId(getDomainId);
        event.preventDefault();
    }

    const handleSubdomain = (event) => {
        const getSubdomainId = event.target.value;
        setSubdomainId(getSubdomainId);
        event.preventDefault();
    }

    const handleSubject = (event) => {
        const getSubjectId = event.target.value;
        setSubjectId(getSubjectId);
        event.preventDefault();
    }

    return (
        <div className="content">
            <div>
                <select name="domain" className="form-control" onChange={(e) => handleDomain(e)}>
                    <option>-- Select Domain--</option>
                    {
                        domains?.map((domain) => (
                            <option key={domain.path} value={domain.name}> {domain.name}</option>
                        ))
                    }

                </select>

                <select name="subdomain" className="form-control" onChange={(e) => handleSubdomain(e)}>
                    <option>-- Select Subdomain--</option>
                    {
                        subdomains?.map((subdomain) => (
                            <option key={subdomain.path} value={subdomain.name}> {subdomain.name}</option>
                        ))
                    }
                </select>

                <select name="subject" className="form-control" onChange={(e) => handleSubject(e)}>
                    <option>-- Select Subject--</option>
                    {
                        subjects?.map((subject) => (
                            <option key={subject.path} value={subject.name}> {subject.name}</option>
                        ))
                    }
                </select>

                <div className="form-group col-md-2 mt-4">
                    <button className="btn btn-success mt-2" >Submit</button>
                </div>
            </div>
        </div>
    );

}


export default ContributePage;