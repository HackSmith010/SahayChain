const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const registerUserApi = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed.");
  }
  return response.json();
};

export const loginUserApi = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed.");
  }
  return response.json();
};

export const getUserProfileApi = async (token) => {
  const response = await fetch(`${API_URL}/auth/profile`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user profile.");
  }
  return response.json();
};

export const uploadKycDocumentApi = async (docData, token) => {
  const response = await fetch(`${API_URL}/auth/upload-document`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(docData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to submit document.");
  }
  return response.json();
};
