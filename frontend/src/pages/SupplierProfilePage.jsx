import { useState } from "react";
import { Save, Factory, MapPin } from "lucide-react";

export default function SupplierProfilePage() {
    const [form, setForm] = useState({
        companyName: "Sample Supplier Ltd.",
        serviceArea: "Pune & Mumbai",
        rating: "4.8 / 5",
    });

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Information shown to NGOs & donors.</p>

            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-200">
                <div className="space-y-1">
                    <label className="text-sm text-gray-600 flex items-center gap-2">
                        <Factory size={14} /> Company Name
                    </label>
                    <input
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-xl focus:ring-primary-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm text-gray-600 flex items-center gap-2">
                        <MapPin size={14} /> Service Area
                    </label>
                    <input
                        value={form.serviceArea}
                        onChange={(e) => setForm({ ...form, serviceArea: e.target.value })}
                        className="w-full px-4 py-2 border rounded-xl focus:ring-primary-500"
                    />
                </div>

                <div>
                    <p className="text-gray-700 text-sm">
                        ⭐ <strong>Rating:</strong> {form.rating}
                    </p>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all">
                    <Save size={16} /> Save Changes
                </button>
            </div>
        </div>
    );
}
