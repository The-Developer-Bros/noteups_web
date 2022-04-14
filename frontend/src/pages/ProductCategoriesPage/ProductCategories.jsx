import React from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import { getAllArtsSubdomains, getAllCommerceSubdomains, getAllEngineeringSubdomains } from '../../redux/slices/SubdomainSlice'
import ProductCard from './ProductCard'
import "./ProductCategories.scss"

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}


const ProductCategories = () => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const engineeringSubjects = useSelector(getAllEngineeringSubdomains);
    const artsSubjects = useSelector(getAllArtsSubdomains);
    const commerceSubjects = useSelector(getAllCommerceSubdomains);

    let renderArtsSubjects = "";

    renderArtsSubjects = artsSubjects.total_count >= 0 ?
        (
            artsSubjects.folders.map((artsSubject, index) => (
                <ProductCard key={index} data={artsSubject} />
            ))
        ) : (
            <div className="arts-subjects-error">
                <h3>{artsSubjects.Error}</h3>
            </div>
        )

    let renderEngineeringSubjects = "";

    renderEngineeringSubjects = engineeringSubjects.total_count >= 0 ?
        (
            engineeringSubjects.folders.map((engineeringSubject, index) => (
                <ProductCard key={index} data={engineeringSubject} />
            ))
        ) : (
            <div className="engineering-subjects-error">
                <h3>{engineeringSubjects.Error}</h3>
            </div>
        )

    let renderCommerceSubjects = "";

    renderCommerceSubjects = commerceSubjects.total_count >= 0 ?
        (
            commerceSubjects.folders.map((commerceSubject, index) => (
                <ProductCard key={index} data={commerceSubject} />
            ))
        ) : (
            <div className="commerce-subjects-error">
                <h3>{commerceSubjects.Error}</h3>
            </div>
        )

    return (
        <div className="subjects-wrapper">

            <div className="engineering-list">
                <h2>Engineering Subjects</h2>
                <div className="engineering-container">
                    <Slider {...settings} >
                        {renderEngineeringSubjects}
                    </Slider>
                </div>
            </div>

            <div className="arts-list">
                <h2>Arts Subjects</h2>
                <div className="arts-container">
                    <Slider {...settings} >
                        {renderArtsSubjects}
                    </Slider>
                </div>
            </div>

            <div className="commerce-list">
                <h2>Commerce Subjects</h2>
                <div className="commerce-container">
                    <Slider {...settings} >
                        {renderCommerceSubjects}
                    </Slider>
                </div>
            </div>

        </div>
    )

}

export default ProductCategories