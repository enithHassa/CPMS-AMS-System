import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "../header";
import Footer from "../../components_home/Home_Footer";

function AddClient() {

    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();

        // Check if email and password are filled
        if (!email || !password) {
            alert("Email and password are required.");
            return;
        }

        const newClient = {
            fname,
            lname,
            nic,
            address,
            district,
            province,
            phone,
            email,
            password
        };

        axios.post("http://localhost:8070/client/addClient", newClient).then(() => {
            alert("Client Added Successfully!!");
            navigate("/successCli_Page");

        }).catch((err) => {
            alert(err);
        });
    }

    return(
        <div>
            <Header />
            <div className="container">
                <br/><br/>
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Client's First name:</label>
                        <input type="text" className="form-control" id="fname" onChange={(e) => setFName(e.target.value)} />
                        <label for="name" className="form-label">Client's Last name:</label>
                        <input type="text" className="form-control" id="lname" onChange={(e) => setLName(e.target.value)} />

                        <div id="emailHelp" className="form-text">We'll never share your profile with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label for="nic" className="form-label">NIC:</label>
                        <input type="text" className="form-control" id="nic" onChange={(e) => setNic(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label for="address" className="form-label">Address:</label>
                        <input type="text" className="form-control" id="address" onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label for="district" className="form-label">District:</label>
                        <input type="text" className="form-control" id="district" onChange={(e) => setDistrict(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label for="province" className="form-label">Province:</label>
                        <input type="text" className="form-control" id="province" onChange={(e) => setProvince(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label for="phone" className="form-label">Phone:</label>
                        <input type="text" className="form-control" id="phone" onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label for="email" className="form-label">Email address:</label>
                        <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label for="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Add New Client</button>
                </form>
                <br/><br/>
            </div>
            <Footer />
        </div>
    );
}

export default AddClient;
