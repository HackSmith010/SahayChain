import { useState } from "react";
import { Truck, CheckCircle, Upload, Star, MapPin, Calendar } from "lucide-react";

const mockDeliveries = [
    {
        id: "D1",
        item: "Rice (kg)",
        quantity: 100,
        supplier: "Food Distributors Ltd.",
        status: "delivered_pending",
        delivered_at: "2024-01-16T15:00:00Z",
        location: "Mumbai, MH",
    },
    {
        id: "D2",
        item: "Blankets",
        quantity: 80,
        supplier: "Warm Comfort Inc.",
        status: "in_transit",
        delivered_at: null,
        location: "Mumbai, MH",
    },
];

export default function DeliveriesToConfirmPage() {
    const [selected, setSelected] = useState(null);
    const [confirmedIds, setConfirmedIds] = useState([]);
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState("");

    const handleConfirm = () => {
        if (!selected) return;
        console.log("Mock confirm delivery", {
            id: selected.id,
            rating,
            notes,
        });
        setConfirmedIds((prev) => [...prev, selected.id]);
        setSelected(null);
        setRating(0);
        setNotes("");
    };

    const formatDate = (d) =>
        d
            ? new Date(d).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
            : "TBD";

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Deliveries to Confirm
                </h1>
                <p className="text-gray-600">
                    Confirm received items so donors can see the final impact trail.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Item
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Supplier
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {mockDeliveries.map((d) => {
                            const confirmed = confirmedIds.includes(d.id);
                            return (
                                <tr key={d.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">
                                            {d.item}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <MapPin size={12} />
                                            {d.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {d.supplier}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                        {d.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex flex-col gap-1">
                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                                                <Truck size={14} />
                                                {d.status === "delivered_pending"
                                                    ? "Awaiting your confirmation"
                                                    : "In transit"}
                                            </span>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Calendar size={12} />
                                                {d.status === "delivered_pending"
                                                    ? `Delivered: ${formatDate(d.delivered_at)}`
                                                    : "ETA: soon"}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {d.status === "delivered_pending" && !confirmed ? (
                                            <button
                                                onClick={() => setSelected(d)}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-xl text-sm font-semibold"
                                            >
                                                <CheckCircle size={16} />
                                                Confirm Delivery
                                            </button>
                                        ) : confirmed ? (
                                            <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                                                <CheckCircle size={16} />
                                                Confirmed
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-sm">
                                                Waiting for delivery
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Simple confirmation panel (inline instead of modal) */}
            {selected && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-green-900">
                            Confirm delivery for {selected.item}
                        </h2>
                        <button
                            onClick={() => setSelected(null)}
                            className="text-sm text-green-700 underline"
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-green-800 mb-2">
                                Upload proof (optional)
                            </label>
                            <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-green-300 rounded-xl cursor-pointer hover:bg-green-100/60 text-green-800 text-sm">
                                <Upload size={16} />
                                <span>Upload photo / document</span>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-green-800 mb-2">
                                Rate the delivery
                            </label>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setRating(s)}
                                        className="text-yellow-400 hover:text-yellow-500"
                                    >
                                        <Star
                                            size={22}
                                            className={s <= rating ? "fill-current" : ""}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-green-800 mb-2">
                            Feedback for supplier (optional)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows="3"
                            placeholder="Share any comments about quality, timeliness, etc."
                            className="w-full px-3 py-2 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleConfirm}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
                        >
                            <CheckCircle size={18} />
                            Confirm & Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
