import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, Link } from "react-router-dom";
import "./styles/HomePage.css"
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Image, Collapse, Button } from 'react-bootstrap';

import BannerData from "../Object/BannerData";
import ContractCard from "../components/ContractCard";

const HomePage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(() => {
        getAllProducts();
    }, []);

    const handleSortChange = (value) => {
        setSortOrder(value);
    };

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/contracts/getall/${page}`);
            setLoading(false);
            if (page === 1) {
                setProducts(data.contracts);
            } else {
                setProducts(prevProducts => [...prevProducts, ...data.contracts]);
            }
            console.log("yes");
            console.log(data.contracts);
            console.log(products);
            setTotal(data.contracts.length);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/contracts/getall/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const clearFilters = () => {
        setChecked([]);
        setRadio([]);
        setOpen(false);
    }

    const handleFilter = (value, id) => {
        if (id == null) {
            setChecked([]);
        } else {
            let all = [id];
            setChecked(all);
        }
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    const [currentIndexb, setCurrentIndexvb] = useState(0);

    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "10vw",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    };

    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "10vw",
        fontSize: "45px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndexb === 0;
        const newIndex = isFirstSlide ? BannerData.length - 1 : currentIndexb - 1;
        setCurrentIndexvb(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndexb === BannerData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndexb + 1;
        setCurrentIndexvb(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndexvb(slideIndex);
    };

    useEffect(() => {
        const intervalId = setInterval(goToNext, 2000); // Change image every 3 seconds
        return () => clearInterval(intervalId);
    }, [currentIndexb]);

    return (
        <>
            <Layout title={"All Products - Best offers "}>
                <div className="banners">
                    <div onClick={goToPrevious} style={leftArrowStyles}>
                        ❰
                    </div>
                    <div onClick={goToNext} style={rightArrowStyles}>
                        ❱
                    </div>
                    {BannerData.map((banner, index) => (
                        <div key={banner.id} style={{ display: index === currentIndexb ? "block" : "none" }}>
                            <div className="banner-content">
                                <div className="banner-text">
                                    <h2>{banner.title}</h2>
                                    <p>{banner.details}</p>
                                </div>
                                <img src={banner.bannerImage} alt={banner.title} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="homepage-sections">
                    <div className="row align-items-center">
                        <h2 className="service">Services </h2>
                        {BannerData.map((category, index) => (
                            <div key={index} className="col text-center">
                                <div className="custom-card">
                                    <img className="category-img" src={category.bannerImage} alt={category.title} />
                                    <div className="card-body">
                                        <Link to={`/category/${category.slug}`} className="category-link">

                                            <p className="shop-now">{category.title}</p>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                <div className="custom-container Filter-section navbar navbar-expand-lg shadow-none">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#filter" aria-controls="filter" aria-expanded="false" aria-label="Toggle navigation">
                        <span>Filters </span>
                    </button>
                    <div className="custom-container collapse navbar-collapse column" id="filter">
                        <div className="filter-category">
                            <span
                                className={`custom-heading ${checked.length === 0 ? 'text-dark' : ''}`}
                                onClick={() => handleFilter(!checked.includes(null), null)}
                            >
                                All Projects
                            </span>

                            {categories?.map((c) => (
                                <span
                                    key={c._id}
                                    className={`custom-category ${checked.includes(c._id) ? 'text-dark' : ''}`}
                                    onClick={() => handleFilter(!checked.includes(c._id), c._id)}
                                >
                                    {c.name}
                                </span>
                            ))}
                        </div>
                        <div className="filter-button">
                            <button
                                className="custom-button btn btn-outline-primary"
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                            >
                                {open ? '🔦 Hide Filters' : ' 🔦Show Filters'}
                            </button>

                            {open && (
                                <div>
                                </div>
                            )}

                            <button
                                className="btn btn btn-outline-danger rounded custom-reset-button"
                                onClick={() => clearFilters()}
                            >
                                ↻ RESET FILTERS
                            </button>
                        </div>
                    </div>
                </div>

                <div className=" menu-filter mt-3">
                    <Collapse in={open} className="collapse-filter">
                        <div id="example-collapse-text filters filter-sh" className="col-md-5 center">
                            <div className="filters">
                                <div className="d-flex flex-column filter-price">
                                    <h2>Prices</h2>
                                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                    </Radio.Group>
                                </div>
                                <div className="d-flex flex-column filter-sort">
                                    <h2 className="sort-label">Sort by</h2>
                                    <Radio.Group onChange={(e) => setSortOrder(e.target.value)}>
                                        <div>
                                            <Radio className="sort-radio" value="default">Default</Radio>
                                        </div>
                                        <div>
                                            <Radio className="sort-radio" value="highToLow">High to Low</Radio>
                                        </div>
                                        <div>
                                            <Radio className="sort-radio" value="lowToHigh">Low to High</Radio>
                                        </div>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                </div>

                <div className="d-flex flex-wrap m-5">
                    {products?.map((p) => (
                        <ContractCard key={p._id} contract={p} />
                    ))}
                </div>
                <div className="p-3">
                    {products && products.length < total && (
                        <button
                            className="btn btn-warning"
                            onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}
                        >
                            {loading ? "Loading ..." : "Loadmore"}
                        </button>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default HomePage;
