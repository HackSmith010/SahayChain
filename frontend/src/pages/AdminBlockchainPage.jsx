// src/pages/AdminBlockchainPage.jsx
import { useMemo, useState } from "react";
import {
    Activity,
    Link2,
    ExternalLink,
    Search,
    Filter,
    CheckCircle,
    AlertCircle,
    Clock,
    Package,
    Heart,
    ShieldCheck,
} from "lucide-react";

const mockEvents = [
    {
        id: 1,
        type: "DONATION_CREATED",
        description: "Donor funded 50 blankets for Winter Relief Org",
        entity: "Donor: Ankit Mehra",
        ngo: "Winter Relief Org",
        supplier: "Warm Comfort Inc.",
        item: "Blankets",
        quantity: 50,
        amount: 7500,
        currency: "INR",
        tx_hash: "0x742d35Cc6634C0532925a3b8D4a2a3a1a1a1a1a1",
        network: "Polygon Testnet",
        status: "confirmed",
        block_number: 1234567,
        timestamp: "2024-01-15T14:30:00Z",
    },
    {
        id: 2,
        type: "DELIVERY_DISPATCHED",
        description: "Supplier dispatched 100 school bags",
        entity: "Supplier: Quick Supplies Co.",
        ngo: "Hope Foundation",
        supplier: "Quick Supplies Co.",
        item: "School Bags",
        quantity: 100,
        amount: 50000,
        currency: "INR",
        tx_hash: "0x842d35Cc6634C0532925a3b8D4a2a3a1a1a1a1a2",
        network: "Polygon Testnet",
        status: "pending",
        block_number: null,
        timestamp: "2024-01-15T16:00:00Z",
    },
    {
        id: 3,
        type: "DELIVERY_CONFIRMED",
        description: "NGO confirmed receipt of 200kg rice",
        entity: "NGO: Seva Trust",
        ngo: "Seva Trust",
        supplier: "Food Distributors Ltd.",
        item: "Rice (kg)",
        quantity: 200,
        amount: 10000,
        currency: "INR",
        tx_hash: "0x942d35Cc6634C0532925a3b8D4a2a3a1a1a1a1a3",
        network: "Polygon Testnet",
        status: "confirmed",
        block_number: 1234590,
        timestamp: "2024-01-14T11:15:00Z",
    },
];

export default function AdminBlockchainPage() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEvents = useMemo(
        () =>
            mockEvents.filter((event) => {
                const matchesStatus =
                    statusFilter === "all" || event.status === statusFilter;
                const matchesType = typeFilter === "all" || event.type === typeFilter;
                const matchesSearch =
                    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.tx_hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.entity.toLowerCase().includes(searchTerm.toLowerCase());

                return matchesStatus && matchesType && matchesSearch;
            }),
        [statusFilter, typeFilter, searchTerm]
    );

    const stats = useMemo(() => {
        const total = mockEvents.length;
        const confirmed = mockEvents.filter((e) => e.status === "confirmed").length;
        const pending = mockEvents.filter((e) => e.status === "pending").length;

        return { total, confirmed, pending };
    }, []);

    const formatDateTime = (dateString) =>
        new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const getStatusPill = (status) => {
        switch (status) {
            case "confirmed":
                return {
                    label: "Confirmed",
                    className: "bg-green-50 text-green-700 border-green-200",
                    icon: <CheckCircle size={12} />,
                };
            case "pending":
                return {
                    label: "Pending",
                    className: "bg-yellow-50 text-yellow-800 border-yellow-200",
                    icon: <Clock size={12} />,
                };
            default:
                return {
                    label: status,
                    className: "bg-gray-50 text-gray-700 border-gray-200",
                    icon: null,
                };
        }
    };

    const getTypeBadge = (type) => {
        switch (type) {
            case "DONATION_CREATED":
                return {
                    label: "Donation Created",
                    icon: <Heart size={12} />,
                    className: "bg-pink-50 text-pink-700 border-pink-200",
                };
            case "DELIVERY_DISPATCHED":
                return {
                    label: "Delivery Dispatched",
                    icon: <Package size={12} />,
                    className: "bg-blue-50 text-blue-700 border-blue-200",
                };
            case "DELIVERY_CONFIRMED":
                return {
                    label: "Delivery Confirmed",
                    icon: <ShieldCheck size={12} />,
                    className: "bg-green-50 text-green-700 border-green-200",
                };
            default:
                return {
                    label: type,
                    icon: null,
                    className: "bg-gray-50 text-gray-700 border-gray-200",
                };
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-poppins mb-2 flex items-center gap-3">
                        <Activity className="text-primary-600" />
                        Blockchain Events
                    </h1>
                    <p className="text-gray-600 text-lg">
                        View the simulated on-chain traceability log for donations and deliveries.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-right">
                    <div>
                        <div className="text-sm text-gray-500">Total Events</div>
                        <div className="text-2xl font-bold text-primary-600">
                            {stats.total}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Confirmed</div>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.confirmed}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Pending</div>
                        <div className="text-2xl font-bold text-yellow-600">
                            {stats.pending}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters + Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Link2 className="text-primary-600" size={20} />
                        <span className="font-semibold text-gray-800">
                            On-Chain Audit Trail (simulated)
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
                                placeholder="Search by hash, description, or entity..."
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
                                <option value="all">All Status</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                        >
                            <option value="all">All Types</option>
                            <option value="DONATION_CREATED">Donation Created</option>
                            <option value="DELIVERY_DISPATCHED">Delivery Dispatched</option>
                            <option value="DELIVERY_CONFIRMED">Delivery Confirmed</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <Th>Event</Th>
                                <Th>Entities</Th>
                                <Th>Amount</Th>
                                <Th>Hash</Th>
                                <Th>Network</Th>
                                <Th>Status</Th>
                                <Th>Date</Th>
                                <Th className="text-right">Explorer</Th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredEvents.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                                        No events match your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredEvents.map((event) => {
                                    const statusPill = getStatusPill(event.status);
                                    const typeBadge = getTypeBadge(event.type);
                                    const explorerUrl = `https://etherscan.io/tx/${event.tx_hash}`;

                                    return (
                                        <tr
                                            key={event.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            {/* Event */}
                                            <td className="px-6 py-4 align-top">
                                                <div
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold ${typeBadge.className} mb-2`}
                                                >
                                                    {typeBadge.icon}
                                                    {typeBadge.label}
                                                </div>
                                                <div className="text-gray-900 font-medium">
                                                    {event.description}
                                                </div>
                                            </td>

                                            {/* Entities */}
                                            <td className="px-6 py-4 align-top">
                                                <div className="text-gray-800 text-sm">
                                                    {event.entity}
                                                </div>
                                                {event.ngo && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        NGO: {event.ngo}
                                                    </div>
                                                )}
                                                {event.supplier && (
                                                    <div className="text-xs text-gray-500">
                                                        Supplier: {event.supplier}
                                                    </div>
                                                )}
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Item: {event.item} ({event.quantity})
                                                </div>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-4 align-top">
                                                <div className="text-gray-900 font-semibold">
                                                    ₹{event.amount.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {event.currency}
                                                </div>
                                            </td>

                                            {/* Hash */}
                                            <td className="px-6 py-4 align-top">
                                                <code className="block text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                                    {event.tx_hash.slice(0, 10)}...{event.tx_hash.slice(-6)}
                                                </code>
                                                <div className="text-[11px] text-gray-400 mt-1">
                                                    Block: {event.block_number || "pending"}
                                                </div>
                                            </td>

                                            {/* Network */}
                                            <td className="px-6 py-4 align-top">
                                                <div className="text-gray-900 text-sm">
                                                    {event.network}
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4 align-top">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${statusPill.className}`}
                                                >
                                                    {statusPill.icon}
                                                    {statusPill.label}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex items-center gap-2 text-gray-800">
                                                    <Clock size={14} className="text-gray-400" />
                                                    <span>{formatDateTime(event.timestamp)}</span>
                                                </div>
                                            </td>

                                            {/* Explorer */}
                                            <td className="px-6 py-4 align-top text-right">
                                                <a
                                                    href={explorerUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-semibold transition-colors"
                                                >
                                                    <ExternalLink size={14} />
                                                    View on Explorer
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const Th = ({ children, className = "" }) => (
    <th
        className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${className}`}
    >
        {children}
    </th>
);
