import React from "react";

function Client(props) {

    const {fname,lname,nic,address,district,province,phone,email,password} = props.users;

    return(
        <div>
            <h1>Users</h1>
            <br></br>
            <h2>First Name:{fname}</h2>
            <h2>Lasr Name:{lname}</h2>
            <h2>NIC:{nic}</h2>
            <h2>Address:{address}</h2>
            <h2>District:{district}</h2>
            <h2>Province:{province}</h2>
            <h2>Phone:{phone}</h2>
            <h2>Email:{email}</h2>
            <h2>password:{password}</h2>
        </div>
    )
}

export default Client