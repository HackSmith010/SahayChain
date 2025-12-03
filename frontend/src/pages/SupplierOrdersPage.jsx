import { Truck, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

const mockMyOrders = [
    {
        id: "ORD-1002",
        item: "School Bags",
        ngo: "Hope Foundation",
        status: "in_transit",
    },
    {
        id: "ORD-1001",
        item: "Rice (kg)",
        ngo: "Community Kitchen",
        status: "initiated",
    },
];

export default function SupplierOrdersPage() {
    const [orders, setOrders] = useState(mockMyOrders);

    const updateStatus = (id, newStatus) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === id ? { ...o, status: newStatus } : o
            )
        );
    };

    const getStatusUI = (status) => {
        switch (status) {
            case "initiated":
                return { text: "Initiated", icon: <Clock size={16} />, styles: "bg-gray-200 text-gray-800" };
            case "in_transit":
                return { text: "In Transit", icon: <Truck size={16} />, styles: "bg-blue-200 text-blue-800" };
            case "delivered":
                return { text: "Delivered", icon: <CheckCircle size={16} />, styles: "bg-green-200 text-green-800" };
            default:
                return { text: "Unknown", icon: null, styles: "bg-gray-100 text-gray-600" };
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600">
                Update delivery status.
            </p>

            {orders.map((order) => {
                const { text, icon, styles } = getStatusUI(order.status);
                return (
                    <div
                        key={order.id}
                        className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 flex flex-col gap-4"
                    >
                        <div>
                            <p className="font-semibold">{order.item}</p>
                            <p className="text-gray-600 text-sm">NGO: {order.ngo}</p>
                        </div>

                        <span
                            className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold border ${styles}`}
                        >
                            {icon} {text}
                        </span>

                        {/* Status Update Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => updateStatus(order.id, "initiated")}
                                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700"
                            >
                                Initiated
                            </button>
                            <button
                                onClick={() => updateStatus(order.id, "in_transit")}
                                className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700"
                            >
                                In Transit
                            </button>
                            <button
                                onClick={() => updateStatus(order.id, "delivered")}
                                className="px-4 py-2 rounded-xl bg-green-100 text-green-700"
                            >
                                Delivered
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
