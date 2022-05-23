import React, { useState } from 'react'

const Upload = () => {


    //////////////////////////////////// Images ////////////////////////////////////////////

    const [imageInputState, setImageInputState] = useState("");
    const [previewSource, setPreviewSource] = useState();

    const handleImageInputChange = (e) => {
        const image = e.target.images[0];
        previewImage(image);
        setImageInputState(e.target.value);
    };

    const previewImage = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitImage = (e) => {
        console.log("handleSubmitImage");
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource);
    }

    const uploadImage = async (base64EncodedImage) => {
        console.log("uploading image");
        console.log(base64EncodedImage);
        try {
            await fetch("/productApi/upload", {
                method: "POST",
                body: JSON.stringify({
                    data: base64EncodedImage
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    //////////////////////////////////// PDFs ////////////////////////////////////////////

    const [pdfInputState, setPdfInputState] = useState("");
    const [previewPdfSource, setPreviewPdfSource] = useState();

    const handlePdfInputChange = (e) => {
        const pdf = e.target.pdf[0];
        previewPdf(pdf);
        setPdfInputState(e.target.value);
    };

    const previewPdf = (pdf) => {
        const reader = new FileReader();
        reader.readAsDataURL(pdf);
        reader.onloadend = () => {
            setPreviewPdfSource(reader.result);
        };
    };

    const handleSubmitPdf = (e) => {
        console.log("handleSubmitPdf");
        e.preventDefault();
        if (!previewPdfSource) return;
        uploadPdf(previewPdfSource);
    }

    const uploadPdf = async (base64EncodedPdf) => {
        console.log("uploading pdf");
        console.log(base64EncodedPdf);
        try {
            await fetch("/productApi/upload", {
                method: "POST",
                body: JSON.stringify({
                    data: base64EncodedPdf
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error(error);
        }
    }


    //////////////////////////////////// ////////////////////////////////////////////

    // Files in cloudinary are organized as domains/subjects/*.pdf

    // Function to get all domains
    const getDomains = async () => {
        try {
            const domainResponse = await fetch("/productApi/domains");
            const domainJson = await domainResponse.json();
            console.log(domainJson);
            return domainJson;

        } catch (error) {
            console.error(error);
        }
    }


    // Function to get all subjects within a domain
    const getSubjects = async (domain) => {
        try {
            const subjectResponse = await fetch(`/productApi/domains/${domain}`);
            const subjectJson = await subjectResponse.json();
            console.log(subjectJson);
            return subjectJson;
        } catch (error) {
            console.error(error);
        }
    }



    /////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <h1>Upload</h1>



            <form onSubmit={handleSubmitImage} className="upload-form">
                <input
                    type="image"
                    name="image"
                    onChange={handleImageInputChange}
                    value={imageInputState}
                    className="form-input"
                    alt="Upload an image"
                />
                <button type="submit" className="btn btn-success">Submit</button>
            </form>

            {previewSource && <img src={previewSource} alt="preview" style={{ height: "300px" }} />}
        </div>
    )
}

export default Upload