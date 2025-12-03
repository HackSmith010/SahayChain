// src/pages/AdminFlaggedNeedsPage.jsx
import { useState, useMemo } from "react";
import {
    Flag,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Filter,
    Search,
    MapPin,
    Clock,
    Package,
    ShieldCheck,
    Eye,
} from "lucide-react";

const mockFlaggedNeeds = [
    {
        id: "REQ-123",
        ngo: "Hope Foundation",
        ngo_verified: true,
        item: "Blankets",
        quantity: 1000,
        category: "Clothing",
        location: "Delhi, DL",
        reason: "Quantity unusually high vs NGO history",
        riskScore: 86,
        status: "pending_review",
        created_at: "2024-01-15T10:00:00Z",
        last_reviewed_at: null,
        ai_notes: "Request exceeds 3x average order size for this NGO in winter.",
    },
    {
        id: "REQ-124",
        ngo: "Seva Trust",
        ngo_verified: true,
        item: "Rice (kg)",
        quantity: 5000,
        category: "Food",
        location: "Mumbai, MH",
        reason: "Multiple similar requests in short time",
        riskScore: 72,
        status: "pending_review",
        created_at: "2024-01-14T16:30:00Z",
        last_reviewed_at: null,
        ai_notes: "Three requests for rice created within 24 hours.",
    },
    {
        id: "REQ-125",
        ngo: "City Elders Home",
        ngo_verified: false,
        item: "Medicine Kits",
        quantity: 50,
        category: "Health",
        location: "Pune, MH",
        reason: "Unverified NGO, high-risk category",
        riskScore: 64,
        status: "escalated",
        created_at: "2024-01-13T11:20:00Z",
        last_reviewed_at: "2024-01-14T09:00:00Z",
        ai_notes: "Health-related items from unverified NGO.",
    },
    {
        id: "REQ-126",
        ngo: "Winter Relief Org",
        ngo_verified: true,
        item: "Jackets",
        quantity: 150,
        category: "Clothing",
        location: "Bangalore, KA",
        reason: "No anomaly detected – auto-cleared",
        riskScore: 21,
        status: "cleared",
        created_at: "2024-01-12T09:45:00Z",
        last_reviewed_at: "2024-01-12T10:15:00Z",
        ai_notes: "AI flagged briefly, then auto-marked safe after cross-check.",
    },
];

export default function AdminFlaggedNeedsPage() {
    const [needs, setNeeds] = useState(mockFlaggedNeeds);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNeeds = useMemo(
        () =>
            needs.filter((need) => {
                const matchesStatus =
                    statusFilter === "all" || need.status === statusFilter;
                const matchesSearch =
                    need.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    need.ngo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    need.item.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesStatus && matchesSearch;
            }),
        [needs, statusFilter, searchTerm]
    );

    const stats = useMemo(() => {
        const total = needs.length;
        const pending = needs.filter((n) => n.status === "pending_review").length;
        const escalated = needs.filter((n) => n.status === "escalated").length;
        const cleared = needs.filter((n) => n.status === "cleared").length;
        const avgRisk =
            needs.reduce((sum, n) => sum + n.riskScore, 0) / (needs.length || 1);

        return { total, pending, escalated, cleared, avgRisk: Math.round(avgRisk) };
    }, [needs]);

    const handleUpdateStatus = (id, newStatus) => {
        setNeeds((prev) =>
            prev.map((n) =>
                n.id === id
                    ? { ...n, status: newStatus, last_reviewed_at: new Date().toISOString() }
                    : n
            )
        );
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "pending_review":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "cleared":
                return "bg-green-100 text-green-800 border-green-200";
            case "escalated":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const formatDate = (dateString) =>
        dateString
            ? new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
            : "—";

    const getTimeAgo = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) return "Just now";
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
        return formatDate(dateString);
    };

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-poppins mb-2 flex items-center gap-3">
                        <Flag className="text-red-500" />
                        Flagged Needs
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Review AI-flagged item requests and decide whether to clear, edit, or escalate.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-right">
                    <div>
                        <div className="text-sm text-gray-500">Pending Review</div>
                        <div className="text-2xl font-bold text-orange-600">
                            {stats.pending}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Avg. Risk Score</div>
                        <div className="text-2xl font-bold text-red-600">
                            {stats.avgRisk}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Flagged"
                    value={stats.total}
                    description="All AI-flagged requests"
                    icon={<AlertTriangle className="text-red-500" size={22} />}
                    color="from-red-50 to-red-100"
                    borderColor="border-red-200"
                />
                <StatCard
                    title="Escalated Cases"
                    value={stats.escalated}
                    description="Needs deeper review"
                    icon={<Flag className="text-orange-500" size={22} />}
                    color="from-orange-50 to-orange-100"
                    borderColor="border-orange-200"
                />
                <StatCard
                    title="Cleared as Safe"
                    value={stats.cleared}
                    description="Reviewed and approved"
                    icon={<CheckCircle className="text-green-500" size={22} />}
                    color="from-green-50 to-green-100"
                    borderColor="border-green-200"
                />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="text-yellow-500" size={20} />
                        <span className="font-semibold text-gray-800">
                            AI Anomaly Detection Queue
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search by ID, NGO, or item..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <div className="relative">
                            <Filter
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending_review">Pending Review</option>
                                <option value="cleared">Cleared</option>
                                <option value="escalated">Escalated</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <Th>Request</Th>
                                <Th>NGO</Th>
                                <Th>Location</Th>
                                <Th>Reason</Th>
                                <Th>Risk</Th>
                                <Th>Submitted</Th>
                                <Th>Status</Th>
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredNeeds.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                                        No flagged needs match your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredNeeds.map((need) => (
                                    <tr key={need.id} className="hover:bg-gray-50 transition-colors">
                                        {/* Request */}
                                        <td className="px-6 py-4 align-top">
                                            <div className="font-semibold text-gray-900 flex items-center gap-2">
                                                <Package size={14} className="text-gray-500" />
                                                {need.item}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                ID: <span className="font-mono">{need.id}</span>
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                Category: {need.category}
                                            </div>
                                        </td>

                                        {/* NGO */}
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-900">
                                                    {need.ngo}
                                                </span>
                                                {need.ngo_verified && (
                                                    <ShieldCheck size={14} className="text-green-500" />
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Qty: {need.quantity.toLocaleString()}
                                            </div>
                                        </td>

                                        {/* Location */}
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <MapPin size={14} className="text-gray-400" />
                                                {need.location}
                                            </div>
                                        </td>

                                        {/* Reason */}
                                        <td className="px-6 py-4 align-top">
                                            <div className="text-gray-800 text-xs mb-1">
                                                {need.reason}
                                            </div>
                                            <div className="text-gray-500 text-xs italic">
                                                {need.ai_notes}
                                            </div>
                                        </td>

                                        {/* Risk */}
                                        <td className="px-6 py-4 align-top">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                                                <AlertTriangle size={12} />
                                                Risk {need.riskScore}
                                            </div>
                                        </td>

                                        {/* Submitted */}
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Clock size={14} className="text-gray-400" />
                                                <div>
                                                    <div>{formatDate(need.created_at)}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {getTimeAgo(need.created_at)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4 align-top">
                                            <span
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
                                                    need.status
                                                )}`}
                                            >
                                                {need.status === "cleared" && <CheckCircle size={12} />}
                                                {need.status === "pending_review" && (
                                                    <AlertTriangle size={12} />
                                                )}
                                                {need.status === "escalated" && <Flag size={12} />}
                                                {need.status.replace("_", " ").toUpperCase()}
                                            </span>
                                            {need.last_reviewed_at && (
                                                <div className="mt-1 text-[11px] text-gray-500">
                                                    Reviewed {getTimeAgo(need.last_reviewed_at)}
                                                </div>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 align-top text-right">
                                            <div className="flex flex-col gap-2 items-end">
                                                <button className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 text-xs font-medium">
                                                    <Eye size={14} />
                                                    Open full request
                                                </button>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleUpdateStatus(need.id, "cleared")}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold border border-green-200"
                                                    >
                                                        <CheckCircle size={12} />
                                                        Mark Safe
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(need.id, "escalated")}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200"
                                                    >
                                                        <XCircle size={12} />
                                                        Escalate
                                                    </button>
                                                </div>
                                            </div>
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

const StatCard = ({ title, value, description, icon, color, borderColor }) => (
    <div
        className={`bg-gradient-to-br ${color} border ${borderColor} rounded-2xl p-5 shadow-lg`}
    >
        <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-3 shadow-sm">{icon}</div>
            <div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div className="text-gray-700 font-semibold text-sm">{title}</div>
                <div className="text-xs text-gray-500 mt-1">{description}</div>
            </div>
        </div>
    </div>
);

const Th = ({ children, className = "" }) => (
    <th
        className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${className}`}
    >
        {children}
    </th>
);
