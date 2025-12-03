import { CheckCircle, Image as ImageIcon, MapPin, Activity } from "lucide-react";

const mockImpactReports = [
    {
        id: "IR-2001",
        title: "School Bags Delivered to Hope Foundation",
        ngo: "Hope Foundation",
        item: "School Bags",
        quantity: 50,
        location: "Mumbai, MH",
        delivered_at: "2024-01-08T14:00:00Z",
        proof_url: "https://placehold.co/600x400?text=Delivery+Photo",
        summary:
            "50 school bags were distributed to students in grades 3–5, enabling them to start the term with dignity and essential supplies.",
        chain_events: 4,
    },
    {
        id: "IR-2000",
        title: "Rice Distribution at Community Kitchen",
        ngo: "Community Kitchen",
        item: "Rice (kg)",
        quantity: 80,
        location: "Pune, MH",
        delivered_at: "2024-01-05T16:30:00Z",
        proof_url: "https://placehold.co/600x400?text=Community+Kitchen",
        summary:
            "Your sponsored rice helped serve approximately 480 meals over three days to low-income families.",
        chain_events: 3,
    },
];

export default function ImpactReportsPage() {
    const formatDate = (d) =>
        new Date(d).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Impact Reports</h1>
                <p className="text-gray-600">
                    View proof of delivery and a simple &quot;blockchain-style&quot; event
                    trail for your donations.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {mockImpactReports.map((r) => (
                    <div
                        key={r.id}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col"
                    >
                        {/* Image / proof mock */}
                        <div className="relative bg-gray-100 h-48 overflow-hidden">
                            <img
                                src={r.proof_url}
                                alt="Delivery proof"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-green-700">
                                <CheckCircle size={14} />
                                Delivery Confirmed
                            </div>
                        </div>

                        <div className="p-6 flex flex-col gap-4 flex-1">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {r.title}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">{r.ngo}</p>
                            </div>

                            <div className="text-sm text-gray-700 space-y-1">
                                <div>
                                    <span className="font-medium">Item:</span> {r.item}
                                </div>
                                <div>
                                    <span className="font-medium">Quantity:</span> {r.quantity}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} className="text-gray-500" />
                                    <span>{r.location}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Delivered on:</span>{" "}
                                    {formatDate(r.delivered_at)}
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 flex-1">{r.summary}</p>

                            {/* Simulated chain timeline */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-600 space-y-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity size={14} className="text-primary-600" />
                                    <span className="font-semibold">
                                        Traceability events (simulated)
                                    </span>
                                </div>
                                <ul className="space-y-1">
                                    <li>• Donation pledge recorded</li>
                                    <li>• Supplier accepted the order</li>
                                    <li>• Items marked as dispatched</li>
                                    <li>• NGO confirmed delivery</li>
                                </ul>
                                <p className="mt-1 text-[11px] text-gray-500">
                                    Later, each of these will map to an actual blockchain event
                                    with transaction hashes.
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {mockImpactReports.length === 0 && (
                    <div className="col-span-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center text-gray-600">
                        Once deliveries are confirmed, your impact reports will appear here.
                    </div>
                )}
            </div>
        </div>
    );
}
