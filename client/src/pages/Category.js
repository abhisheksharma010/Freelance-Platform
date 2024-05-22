import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Spin, message } from "antd";
import Layout from "../components/Layout";
import ContractCard from "../components/ContractCard";
import { Route } from "react-router-dom";

const Category = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        getContracts();
    }, [slug]); // Update contracts when category changes

    const getContracts = async () => {
        // setLoading(true);
        try {
            console.log(`/contracts/category/${slug}`);
            const { data } = await axios.get(`/contracts/category/${slug}`);
            setContracts(data.contracts);
            console.log(data.contracts);
        } catch (error) {
            console.log(error);
            message.error("Failed to fetch contracts");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title={`Contracts - ${slug}`}>
            <div className="container mt-5">
                <h1 className="text-center">Contract</h1>
                <div className="row">
                    {loading ? (
                        <div className="text-center">
                            <Spin size="large" />
                        </div>
                    ) : contracts.length ? (
                        contracts.map((contract) => (
                            <div className="col-md-4 mb-4" key={contract._id}>
                                <ContractCard contract={contract} />
                            </div>
                        ))
                    ) : (
                        <div className="col-md-12">
                            <p>No contracts available.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Category;

{/* <Route path='/category/:slug' element={<Category />} /> */ }
