import { Package, Truck, CheckCircle, Clock } from "lucide-react";

const mockDonations = [
    {
        id: "DN-1001",
        item: "School Bags",
        ngo: "Hope Foundation",
        quantity: 30,
        status: "in_transit",
        created_at: "2024-01-12T10:00:00Z",
        eta: "2024-01-18T15:00:00Z",
    },
    {
        id: "DN-1000",
        item: "Rice (kg)",
        ngo: "Community Kitchen",
        quantity: 50,
        status: "delivered",
        created_at: "2024-01-05T11:30:00Z",
        delivered_at: "2024-01-08T14:00:00Z",
    },
    {
        id: "DN-0995",
        item: "Blankets",
        ngo: "Winter Relief Org",
        quantity: 20,
        status: "initiated",
        created_at: "2024-01-03T09:45:00Z",
    },
];

export default function DonationsPage() {
    const formatDateTime = (d) =>
        d
            ? new Date(d).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
            : "TBD";

    const getStatusDetails = (status) => {
        switch (status) {
            case "initiated":
                return {
                    label: "Initiated",
                    icon: <Clock size={14} />,
                    styles: "bg-gray-100 text-gray-700 border-gray-200",
                };
            case "in_transit":
                return {
                    label: "In Transit",
                    icon: <Truck size={14} />,
                    styles: "bg-blue-100 text-blue-800 border-blue-200",
                };
            case "delivered":
                return {
                    label: "Delivered",
                    icon: <CheckCircle size={14} />,
                    styles: "bg-green-100 text-green-800 border-green-200",
                };
            default:
                return {
                    label: "Unknown",
                    icon: <Package size={14} />,
                    styles: "bg-gray-100 text-gray-700 border-gray-200",
                };
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Donations</h1>
                <p className="text-gray-600">
                    Track where your sponsored items are in the journey.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Donation ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Item
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                NGO
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Timeline
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {mockDonations.map((d) => {
                            const sd = getStatusDetails(d.status);
                            return (
                                <tr key={d.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-900">
                                        {d.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">
                                            {d.item}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{d.ngo}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                        {d.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${sd.styles}`}
                                        >
                                            {sd.icon}
                                            {sd.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-600">
                                        <div className="space-y-1">
                                            <div>
                                                <span className="font-medium">Created:</span>{" "}
                                                {formatDateTime(d.created_at)}
                                            </div>
                                            {d.status === "in_transit" && d.eta && (
                                                <div>
                                                    <span className="font-medium">ETA:</span>{" "}
                                                    {formatDateTime(d.eta)}
                                                </div>
                                            )}
                                            {d.status === "delivered" && d.delivered_at && (
                                                <div>
                                                    <span className="font-medium">Delivered:</span>{" "}
                                                    {formatDateTime(d.delivered_at)}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {mockDonations.length === 0 && (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    You haven&apos;t made any donations yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
