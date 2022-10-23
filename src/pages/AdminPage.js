import React from "react";
import {useNavigate} from "react-router-dom";
import AdminForm from "./AdminForm";

function AdminPage() {

    let navigate = useNavigate();

    return(
        <header>
        <h1 Admin Page></h1>
        <div>
            <AdminForm/>
        </div>
        </header>
    )
}

export default AdminPage





