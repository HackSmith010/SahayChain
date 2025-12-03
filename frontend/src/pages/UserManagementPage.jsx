import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllUsersApi, manuallyConfirmUserApi } from "../api/admin.api.js";
import toast, { Toaster } from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      try {
        const data = await getAllUsersApi(token);
        setUsers(data);
      } catch (error) {
        toast.error(`Failed to fetch users: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  const handleConfirmEmail = async (authId, userName) => {
    const promise = manuallyConfirmUserApi(authId, token);

    toast.promise(promise, {
      loading: `Confirming email for ${userName}...`,
      success: <b>{userName}'s email has been confirmed!</b>,
      error: <b>Could not confirm email.</b>,
    });

    try {
      await promise;
      // Optionally, you can refresh the user list or update the UI here
    } catch (error) {
      // Toast will automatically handle the error message
    }
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="animate-fade-in">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                  {user.role}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleConfirmEmail(user.auth_id, user.name)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800"
                    title="Manually confirm this user's email address"
                  >
                    <ShieldCheck size={16} />
                    <span>Confirm Email</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
