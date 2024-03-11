import { useQuery } from "react-query";
import axios from "axios";

export const getGroupsOfUser = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  const { data, isLoading, error } = useQuery("groups", async () => {
    const { data } = await axios.get(`${API_URL}/api/groups/user`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    return data;
  });

  return { data, isLoading, error };
};

export const getGroupByGroupId = (groupId) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  const { data, isLoading, error } = useQuery("group", async () => {
    const { data } = await axios.get(`${API_URL}/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    return data;
  });

  return { data, isLoading, error };

};

export const getExpensesOfUser = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  const { data, isLoading, error } = useQuery("expenses", async () => {
    const { data } = await axios.get(`${API_URL}/api/expenses/user`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    return data;
  });
  
  return { data, isLoading, error };

};

export const getExpenseByGroupId = (groupId) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const storedToken = localStorage.getItem("authToken");
  
    const { data, isLoading, error } = useQuery("expenses", async () => {
      const { data } = await axios.get(`${API_URL}/api/expenses/group/${groupId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
  
      return data;
    });
  
    
  return { data, isLoading, error };
  };

export const getExpenseByExpenseId = (expenseId) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  const { data, isLoading, error } = useQuery("expense", async () => {
    const { data } = await axios.get(`${API_URL}/api/expenses/${expenseId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    return data;
  });

  
  return { data, isLoading, error };
};

export const deleteExpenseByExpenseId = (expenseId) => {

  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  axios
    .delete(`${API_URL}/api/expenses/${expenseId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))

}
