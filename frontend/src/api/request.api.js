const API_URL = import.meta.env.VITE_API_URL;

const requestApi = async (endpoint, options, token) => {
  const response = await fetch(endpoint, options);
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An API error occurred.");
  }
  return response.json();
};

export const getMyRequestsApi = (token) => {
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return requestApi(`${API_URL}/requests/my-requests`, options, token);
};

export const createRequestApi = (requestData, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  };
  return requestApi(`${API_URL}/requests`, options, token);
};
