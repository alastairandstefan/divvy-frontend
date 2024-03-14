import axios from "axios";


export const getGroupsOfUser = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  try {
    const { data } = await axios.get(`${API_URL}/api/groups/user`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getGroupByGroupId = async (groupId) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  try {
    const { data } = await axios.get(`${API_URL}/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getExpensesOfUser = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  try {
    const { data } = await axios.get(`${API_URL}/api/expenses/user`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getExpensesByGroupId = async (groupId) => {

  if (!groupId) return null;

  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");


  try {
    const { data } = await axios.get(`${API_URL}/api/expenses/group/${groupId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getExpenseByExpenseId = async (expenseId) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  try {
    const { data } = await axios.get(`${API_URL}/api/expenses/${expenseId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteExpenseByExpenseId = (expenseId) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");
  

  

  axios
    .delete(`${API_URL}/api/expenses/${expenseId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

};

