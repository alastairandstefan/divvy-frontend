import GroupCard from "../components/GroupCard";
import { useQuery } from 'react-query';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const fetchGroups = async () => {
 const storedToken = localStorage.getItem("authToken");
 const { data } = await axios.get(`${API_URL}/api/groups/user/`, {
    headers: { Authorization: `Bearer ${storedToken}` },
 });
 return data;
};

const DashboardPage = () => {
 const { data: groups, isLoading, error } = useQuery('groups', fetchGroups);

 if (isLoading) return <div>Loading...</div>;
 if (error) return <div>An error has occurred: {error.message}</div>;

 return (
    <>
      <div><h2>OVERVIEW</h2></div>
      <div>
        <h2>MY GROUPS</h2>
        {groups && groups.map(group => <GroupCard groupName={group.groupName} key={group._id} />)}
      </div>
    </>
 );
};

export default DashboardPage;