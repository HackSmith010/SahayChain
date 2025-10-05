import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";

// Placeholder API function - you would move this to `src/api/request.api.js`
async function getMyRequestsApi(token) {
  // const response = await fetch('/api/requests/my-requests', { headers: { 'Authorization': `Bearer ${token}` } });
  // return response.json();
  return Promise.resolve([
    // Mock data
    { request_id: 1, item: "Blankets", quantity: 100, status: "open" },
    { request_id: 2, item: "Rice (kg)", quantity: 500, status: "fulfilled" },
  ]);
}
async function createRequestApi(data, token) {
  console.log("Creating request:", data);
  return Promise.resolve({ request_id: 3, ...data, status: "open" }); 
}

export default function NgoDashboardPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMyRequestsApi("your-token").then((data) => {
      setRequests(data);
      setIsLoading(false);
    });
  }, []);

  const handleCreateRequest = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newRequestData = {
      item: formData.get("item"),
      quantity: parseInt(formData.get("quantity")),
    };
    const createdRequest = await createRequestApi(newRequestData, "your-token");
    setRequests((prev) => [createdRequest, ...prev]);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Requests</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <PlusCircle size={20} />
          <span>New Request</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleCreateRequest} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Create a New Request
            </h2>
            <div>
              <label
                htmlFor="item"
                className="block text-sm font-medium text-gray-600"
              >
                Item Name
              </label>
              <input
                type="text"
                name="item"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-600"
              >
                Quantity Needed
              </label>
              <input
                type="number"
                name="quantity"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Request History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Loading requests...
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.request_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {req.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          req.status === "open"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
