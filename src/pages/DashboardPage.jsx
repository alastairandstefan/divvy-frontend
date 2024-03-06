import GroupCard from "../components/GroupCard";
import {useEffect, useState} from 'react';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const DashboardPage = () => {

    const [groups, setGroups] = useState(null);

    const storedToken = localStorage.getItem("authToken");
    
    useEffect(() => {
        axios.get(`${API_URL}/api/groups/user/`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then(res => setGroups(res.data))
          .catch(err => console.log(err))
    },[])



    return (
        <>
        <div><h2>OVERVIEW</h2></div>

        <div>
            <h2>MY GROUPS</h2>
            { groups && groups.map(group => <GroupCard groupName={group.groupName} key={group._id} />)}
        </div>
        
        </>
    )
}

export default DashboardPage;