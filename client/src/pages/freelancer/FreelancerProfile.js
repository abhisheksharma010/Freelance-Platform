import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Layout from "../../components/Layout";
import FreelancerMenu from '../../components/FreelancerMenu';
import "../styles/FreelancerProfile.css";

const FreelancerProfile = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        skills: [],
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/users");
            setUser(data.user);
            setUserData(data.user);
        } catch (error) {
            setError("Error fetching user data");
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSkillChange = (e, index) => {
        const skills = [...userData.skills];
        skills[index] = e.target.value;
        setUserData({ ...userData, skills: skills });
    };

    const handleAddSkill = () => {
        setUserData({ ...userData, skills: [...userData.skills, ""] });
    };

    const handleRemoveSkill = (index) => {
        const skills = [...userData.skills];
        skills.splice(index, 1);
        setUserData({ ...userData, skills: skills });
    };

    const handleSubmit = async () => {
        if (userData.skills.some(skill => !skill.trim())) {
            setError("Please fill in all skills");
            return;
        }

        try {
            const { data } = await axios.put("/users", userData);
            setUser(data);
            setSuccess("Profile updated successfully");
        } catch (error) {
            setError("Error updating profile");
            console.log(error);
        }
    };

    return (
        <Layout title={"Freelancer Profile"}>
            <div className="container-fluid mt-1 p-3 dashboard">
                <div className="row align-items-start">
                    <div className="col-md-3 d-flex align-items-start">
                        <FreelancerMenu />
                    </div>
                    <div className="col-md-9">
                        <div className=" row dashboard" style={{ alignItems: 'flex-start' }}>
                            <div className="col-md-12">
                                <h1 className="text-center"> Profile</h1>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                {user && (
                                    <div>
                                        <input type="text" name="name" value={userData.name} onChange={handleChange} className="profile-input" />
                                        <input type="text" name="email" value={userData.email} onChange={handleChange} className="profile-input" />
                                        <input type="text" name="phone" value={userData.phone} onChange={handleChange} className="profile-input" />
                                        <input type="text" name="address" value={userData.address} onChange={handleChange} className="profile-input" />
                                        <div>
                                            <h3>Skills</h3>
                                            <div className="skills">
                                                {userData.skills.map((skill, index) => (
                                                    <div key={index} className="skill-input-wrapper">
                                                        <input
                                                            type="text"
                                                            value={skill}
                                                            onChange={(e) => handleSkillChange(e, index)}
                                                            className="skill-input"
                                                        />
                                                        <MdDelete
                                                            className="delete-icon"
                                                            onClick={() => handleRemoveSkill(index)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={handleAddSkill} className="add-skill-btn">Add Skill</button>
                                        </div>
                                        <button onClick={handleSubmit} className="submit-btn">Save Changes</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FreelancerProfile;
