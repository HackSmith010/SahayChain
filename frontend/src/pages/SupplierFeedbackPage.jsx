import { Star, Truck, MessageCircle } from "lucide-react";

const mockFeedback = [
    {
        id: 1,
        supplier: "Quick Supplies Co.",
        item: "School Bags",
        quantity: 75,
        rating: 5,
        comment: "Very timely and great quality.",
        date: "2024-01-10T11:00:00Z",
    },
    {
        id: 2,
        supplier: "Food Distributors Ltd.",
        item: "Rice (kg)",
        quantity: 300,
        rating: 4,
        comment: "Good overall, minor delay in arrival.",
        date: "2024-01-05T15:30:00Z",
    },
];

export default function SupplierFeedbackPage() {
    const formatDate = (d) =>
        new Date(d).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Supplier Feedback & Sentiment
                </h1>
                <p className="text-gray-600">
                    See how your suppliers have performed across previous deliveries.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {mockFeedback.map((fb) => (
                    <div
                        key={fb.id}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col gap-4"
                    >
                        <div className="flex justify-between items-start gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Truck size={18} className="text-primary-600" />
                                    <h2 className="font-semibold text-gray-900">
                                        {fb.supplier}
                                    </h2>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    {fb.item} · Qty: {fb.quantity}
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                            key={s}
                                            size={16}
                                            className={`${s <= fb.rating
                                                ? "text-yellow-400 fill-current"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500 mt-1">
                                    {formatDate(fb.date)}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 text-sm text-gray-700">
                            <MessageCircle size={16} className="text-primary-500 mt-0.5" />
                            <p>{fb.comment}</p>
                        </div>
                    </div>
                ))}

                {mockFeedback.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center col-span-full">
                        <p className="text-gray-600">
                            No feedback yet. Once you confirm deliveries, supplier ratings
                            will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
