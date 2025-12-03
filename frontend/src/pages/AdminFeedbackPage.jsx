// src/pages/AdminFeedbackPage.jsx
import { useMemo, useState } from "react";
import {
    Star,
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Filter,
    Search,
    Building,
    Truck,
    User,
    Smile,
    Frown,
    MinusCircle,
} from "lucide-react";

const mockFeedback = [
    {
        id: 1,
        from_type: "ngo",
        from_name: "Hope Foundation",
        about_type: "supplier",
        about_name: "Quick Supplies Co.",
        rating: 5,
        sentiment: "positive",
        comment: "Delivery was on time and the quality was excellent.",
        created_at: "2024-01-15T14:30:00Z",
    },
    {
        id: 2,
        from_type: "ngo",
        from_name: "Seva Trust",
        about_type: "supplier",
        about_name: "Warm Comfort Inc.",
        rating: 3,
        sentiment: "neutral",
        comment: "Delivery was delayed by a day, but communication was clear.",
        created_at: "2024-01-12T11:20:00Z",
    },
    {
        id: 3,
        from_type: "donor",
        from_name: "Anita Sharma",
        about_type: "platform",
        about_name: "SahayChain",
        rating: 4,
        sentiment: "positive",
        comment:
            "Loved being able to see exactly when items were delivered. UI can be a bit faster.",
        created_at: "2024-01-10T09:45:00Z",
    },
    {
        id: 4,
        from_type: "ngo",
        from_name: "Winter Relief Org",
        about_type: "supplier",
        about_name: "City Logistics",
        rating: 2,
        sentiment: "negative",
        comment:
            "Items arrived partially damaged. We need better handling next time.",
        created_at: "2024-01-09T16:10:00Z",
    },
];

export default function AdminFeedbackPage() {
    const [sentimentFilter, setSentimentFilter] = useState("all");
    const [roleFilter, setRoleFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFeedback = useMemo(
        () =>
            mockFeedback.filter((fb) => {
                const matchesSentiment =
                    sentimentFilter === "all" || fb.sentiment === sentimentFilter;
                const matchesRole =
                    roleFilter === "all" || fb.from_type === roleFilter;
                const matchesSearch =
                    fb.from_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    fb.about_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    fb.comment.toLowerCase().includes(searchTerm.toLowerCase());

                return matchesSentiment && matchesRole && matchesSearch;
            }),
        [sentimentFilter, roleFilter, searchTerm]
    );

    const stats = useMemo(() => {
        const total = mockFeedback.length;
        const avgRating =
            mockFeedback.reduce((sum, fb) => sum + fb.rating, 0) / (total || 1);
        const positive = mockFeedback.filter((fb) => fb.sentiment === "positive")
            .length;
        const neutral = mockFeedback.filter((fb) => fb.sentiment === "neutral")
            .length;
        const negative = mockFeedback.filter((fb) => fb.sentiment === "negative")
            .length;

        return {
            total,
            avgRating: avgRating.toFixed(1),
            positive,
            neutral,
            negative,
        };
    }, []);

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const sentimentPill = (sentiment) => {
        switch (sentiment) {
            case "positive":
                return {
                    label: "Positive",
                    className: "bg-green-50 text-green-700 border-green-200",
                    icon: <Smile size={14} />,
                };
            case "neutral":
                return {
                    label: "Neutral",
                    className: "bg-yellow-50 text-yellow-800 border-yellow-200",
                    icon: <MinusCircle size={14} />,
                };
            case "negative":
                return {
                    label: "Negative",
                    className: "bg-red-50 text-red-700 border-red-200",
                    icon: <Frown size={14} />,
                };
            default:
                return {
                    label: "Unknown",
                    className: "bg-gray-50 text-gray-700 border-gray-200",
                    icon: null,
                };
        }
    };

    const roleLabel = (role) => {
        switch (role) {
            case "ngo":
                return { label: "NGO", icon: <Building size={14} /> };
            case "supplier":
                return { label: "Supplier", icon: <Truck size={14} /> };
            case "donor":
                return { label: "Donor", icon: <User size={14} /> };
            default:
                return { label: "User", icon: <User size={14} /> };
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-poppins mb-2 flex items-center gap-3">
                        <MessageCircle className="text-primary-600" />
                        Feedback & Sentiment
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Understand how NGOs, donors, and suppliers experience the platform and deliveries.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-right">
                    <div>
                        <div className="text-sm text-gray-500">Avg. Rating</div>
                        <div className="flex items-center justify-end gap-1 text-2xl font-bold text-yellow-500">
                            <Star className="fill-current" size={20} />
                            <span>{stats.avgRating}</span>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Total Reviews</div>
                        <div className="text-2xl font-bold text-primary-600">
                            {stats.total}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Positive"
                    value={stats.positive}
                    description="Delighted partners"
                    icon={<ThumbsUp className="text-green-500" size={22} />}
                    color="from-green-50 to-green-100"
                    borderColor="border-green-200"
                />
                <StatCard
                    title="Neutral"
                    value={stats.neutral}
                    description="Room for polish"
                    icon={<MinusCircle className="text-yellow-500" size={22} />}
                    color="from-yellow-50 to-yellow-100"
                    borderColor="border-yellow-200"
                />
                <StatCard
                    title="Negative"
                    value={stats.negative}
                    description="Needs immediate attention"
                    icon={<ThumbsDown className="text-red-500" size={22} />}
                    color="from-red-50 to-red-100"
                    borderColor="border-red-200"
                />
            </div>

            {/* Filters + Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="text-primary-600" size={20} />
                        <span className="font-semibold text-gray-800">
                            Recent Feedback Stream
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
                                placeholder="Search by partner, entity, or comment..."
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
                                value={sentimentFilter}
                                onChange={(e) => setSentimentFilter(e.target.value)}
                                className="pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                            >
                                <option value="all">All Sentiments</option>
                                <option value="positive">Positive</option>
                                <option value="neutral">Neutral</option>
                                <option value="negative">Negative</option>
                            </select>
                        </div>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                        >
                            <option value="all">All Roles</option>
                            <option value="ngo">NGOs</option>
                            <option value="donor">Donors</option>
                            <option value="supplier">Suppliers</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <Th>From</Th>
                                <Th>About</Th>
                                <Th>Rating</Th>
                                <Th>Sentiment</Th>
                                <Th>Feedback</Th>
                                <Th>Date</Th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredFeedback.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                        No feedback matches your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredFeedback.map((fb) => {
                                    const pill = sentimentPill(fb.sentiment);
                                    const fromRole = roleLabel(fb.from_type);

                                    return (
                                        <tr
                                            key={fb.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            {/* From */}
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex items-center gap-2 text-gray-900 font-medium">
                                                    {fromRole.icon}
                                                    {fb.from_name}
                                                </div>
                                                <div className="text-xs text-gray-500 capitalize mt-1">
                                                    {fb.from_type}
                                                </div>
                                            </td>

                                            {/* About */}
                                            <td className="px-6 py-4 align-top">
                                                <div className="text-gray-900 font-medium">
                                                    {fb.about_name}
                                                </div>
                                                <div className="text-xs text-gray-500 capitalize mt-1">
                                                    About: {fb.about_type}
                                                </div>
                                            </td>

                                            {/* Rating */}
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            size={14}
                                                            className={
                                                                star <= fb.rating
                                                                    ? "text-yellow-400 fill-current"
                                                                    : "text-gray-200"
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {fb.rating} / 5
                                                </div>
                                            </td>

                                            {/* Sentiment */}
                                            <td className="px-6 py-4 align-top">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${pill.className}`}
                                                >
                                                    {pill.icon}
                                                    {pill.label}
                                                </span>
                                            </td>

                                            {/* Comment */}
                                            <td className="px-6 py-4 align-top">
                                                <p className="text-gray-700 text-sm leading-snug">
                                                    {fb.comment}
                                                </p>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-4 align-top">
                                                <div className="text-gray-800">
                                                    {formatDate(fb.created_at)}
                                                </div>
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

const Th = ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
        {children}
    </th>
);
