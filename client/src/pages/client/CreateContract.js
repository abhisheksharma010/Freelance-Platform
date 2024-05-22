import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ClientMenu from '../../components/ClientMenu';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([
        "Web Development",
        "App Development",
        "Content Writing",
        "Digital Marketing",
        "Others"
    ]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [deadline, setDeadline] = useState("");
    const [quantity, setQuantity] = useState("");
    const [status, setStatus] = useState("Not Assigned");
    const [clientSubmission, setClientSubmission] = useState(false);
    const [category, setCategory] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const contractData = {
                title,
                description,
                amount,
                deadline,
                category
            };
            console.log(contractData);


            const { data } = await axios.post(
                "/contracts/create",
                contractData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Contract Created Successfully");
                // navigate("/client"); // Assuming this is the correct route
            }
        } catch (error) {


            toast.error(`${error}`);
        }
    };


    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3" style={{ alignItems: 'flex-start' }}>
                        <ClientMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Contract</h1>
                        <div className="m-1 w-75">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="form-select mb-3"
                            >
                                {["Not Assigned", "Working", "Completed", "Cancelled"].map((s, index) => (
                                    <option key={index} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-select mb-3"
                            >
                                <option value="">Select a category</option>
                                {categories.map((c, index) => (
                                    <option key={index} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control mb-3"
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control mb-3"
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="form-control mb-3"
                            />
                            <div className="mb-3">
                                <label htmlFor="deadline" className="form-label m-1">Deadline</label>
                                <input
                                    type="date"
                                    id="deadline"
                                    placeholder="Deadline"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    className="form-control"
                                />
                            </div>


                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    CREATE Contract
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;
