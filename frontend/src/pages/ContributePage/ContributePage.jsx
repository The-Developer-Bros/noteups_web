import React, { useState, useEffect, useCallback } from "react";
import "./ContributePage.scss";
import axios from "axios";
import { useDropzone } from 'react-dropzone';

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

    //////////////////////////////// Dropdown Menu Selector ////////////////////////////////////////////////
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

    //////////////////////////////// React Dropzone ////////////////////////////////////////////////

    const [PDFs, setPDFs] = useState([]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        console.log("accepted Files ", acceptedFiles);
        console.log("rejected Files ", rejectedFiles);

        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                setPDFs(prevPDFs => [...prevPDFs, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    }, []);

    useEffect(() => {
        console.log("PDFs ", PDFs);
    }, [PDFs]);

    function handleUpload(domain, subdomain, subject) {
        console.log("Uploading PDF to Cloudinary...");

        // TODO: Axios is posting to frontend and not backend 
        axios.post(`/api/upload/${domain}/${subdomain}/${subject}`, { PDFs })
            .then(res => {
                console.log("Response from server ", res);
            })
            .catch(err => {
                console.log("Error ", err);
            });
    }

    // accept only PDFs
    const { getRootProps, getInputProps, isDragActive } = useDropzone(
        {
            onDrop,
            accept: "application/pdf"
        }
    );

    console.log("getRootProps ", getRootProps);
    console.log("getInputProps ", getInputProps);



    return (
        <div className="content">
            <div className="contribute_container">

                <div className="container_left">
                    <div className="contribute_header">
                        <h1>Contribute</h1>
                    </div>
                    <h2>
                        Select a domain
                    </h2>
                    <select name="domain" className="dropdown_menu" onChange={(e) => handleDomain(e)}>
                        <option>-- Select Domain--</option>
                        {
                            domains?.map((domain) => (
                                <option key={domain.path} value={domain.name}> {domain.name}</option>
                            ))
                        }

                    </select>

                    <h2>
                        Select a subdomain
                    </h2>

                    <select name="subdomain" className="dropdown_menu" onChange={(e) => handleSubdomain(e)}>
                        <option>-- Select Subdomain--</option>
                        {
                            subdomains?.map((subdomain) => (
                                <option key={subdomain.path} value={subdomain.name}> {subdomain.name}</option>
                            ))
                        }
                    </select>

                    <h2>
                        Select a subject
                    </h2>

                    <select name="subject" className="dropdown_menu" onChange={(e) => handleSubject(e)}>
                        <option>-- Select Subject--</option>
                        {
                            subjects?.map((subject) => (
                                <option key={subject.path} value={subject.name}> {subject.name}</option>
                            ))
                        }
                    </select>

                    <div className="form-group col-md-2 mt-4 submit_btn_div">
                        <button className="btn btn-success mt-2 submit_btn" onClick={() => handleUpload(domainId, subdomainId, subjectId)}>Upload</button>
                    </div>
                </div>

                <div className="container_right">
                    <div className="dropzone" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? "Drag is active" : "Drag your files here"}
                    </div>
                    <div className="pdfs">
                        {
                            PDFs.map((pdf, index) => (
                                <div key={index}>
                                    <iframe
                                        src={pdf}
                                        width="100%"
                                        height="500px"
                                        frameBorder="0"
                                        allowFullScreen
                                        title="samplePDF"
                                    />

                                </div>
                            ))
                        }
                    </div>


                </div>
            </div>
        </div>
    );

}


export default ContributePage;