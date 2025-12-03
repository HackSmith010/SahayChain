import { useState } from "react";
import {
    Search,
    Filter,
    Package,
    Calendar,
    Clock,
    Truck,
    CheckCircle,
} from "lucide-react";

const mockNeeds = [
    {
        id: 1,
        item: "School Bags",
        category: "Education",
        quantity: 150,
        fulfilled: 75,
        status: "open",
        created_at: "2024-01-15T10:00:00Z",
        urgency: "high",
    },
    {
        id: 2,
        item: "Rice (kg)",
        category: "Food",
        quantity: 800,
        fulfilled: 200,
        status: "in_transit",
        created_at: "2024-01-14T14:30:00Z",
        urgency: "medium",
    },
    {
        id: 3,
        item: "Blankets",
        category: "Clothing",
        quantity: 500,
        fulfilled: 500,
        status: "delivered",
        created_at: "2024-01-10T09:15:00Z",
        urgency: "high",
    },
];

export default function InstitutionNeedsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredNeeds = mockNeeds.filter((n) => {
        const matchesSearch =
            n.item.toLowerCase().includes(search.toLowerCase()) ||
            n.category.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || n.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusChip = (status) => {
        switch (status) {
            case "open":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "in_transit":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "delivered":
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "open":
                return <Clock size={14} />;
            case "in_transit":
                return <Truck size={14} />;
            case "delivered":
                return <CheckCircle size={14} />;
            default:
                return <Package size={14} />;
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Needs</h1>
                    <p className="text-gray-600">
                        Track all the item-based needs you&apos;ve created.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by item or category..."
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <div className="relative w-full md:w-48">
                    <Filter
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="all">All statuses</option>
                        <option value="open">Open</option>
                        <option value="in_transit">In transit</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Item
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Fulfilled
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Created
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {filteredNeeds.map((need) => {
                            const progress = Math.round(
                                (need.fulfilled / need.quantity) * 100
                            );
                            return (
                                <tr key={need.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">
                                            {need.item}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {need.category}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                        {need.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-700 font-medium">
                                                {need.fulfilled} / {need.quantity}
                                            </span>
                                            <div className="w-32 bg-gray-200 rounded-full h-1.5">
                                                <div
                                                    className="h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusChip(
                                                need.status
                                            )}`}
                                        >
                                            {getStatusIcon(need.status)}
                                            {need.status.replace("_", " ").toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" />
                                            {formatDate(need.created_at)}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredNeeds.length === 0 && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No needs match your filters yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
