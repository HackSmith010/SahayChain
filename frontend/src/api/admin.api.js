const API_URL = import.meta.env.VITE_API_URL;

const adminRequest = async (endpoint, method = "GET", body = null, token) => {
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`${API_URL}/admin${endpoint}`, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API call to ${endpoint} failed.`);
  }
  return response.json();
};

// --- Institution Verification ---
export const getPendingInstitutionsApi = (token) =>
  adminRequest("/institutions/pending", "GET", null, token);

export const verifyInstitutionApi = (institutionId, newStatus, token) =>
  adminRequest(
    `/institutions/${institutionId}/verify`,
    "PUT",
    { newStatus },
    token
  );

// --- Supplier Verification ---
export const getPendingSuppliersApi = (token) =>
  adminRequest("/suppliers/pending", "GET", null, token);

export const verifySupplierApi = (supplierId, is_verified, token) =>
  adminRequest(
    `/suppliers/${supplierId}/verify`,
    "PUT",
    { is_verified },
    token
  );
