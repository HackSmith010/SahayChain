import { useState } from "react";
import { PackagePlus, Check, AlertCircle } from "lucide-react";

export default function CreateNeedPage() {
    const [form, setForm] = useState({
        item: "",
        category: "",
        quantity: "",
        urgency: "medium",
        description: "",
    });
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
        setSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.item || !form.category || !form.quantity) {
            setError("Please fill in all required fields.");
            return;
        }

        console.log("Mock submit need:", form);
        setSubmitted(true);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Need</h1>
                <p className="text-gray-600">
                    Describe the items you need so donors and suppliers can respond.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Item & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Item Name *
                            </label>
                            <input
                                type="text"
                                name="item"
                                value={form.item}
                                onChange={handleChange}
                                placeholder="e.g., Rice, Blankets, Notebooks"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="">Select category</option>
                                <option value="Food">Food</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Education">Education</option>
                                <option value="Health">Health</option>
                                <option value="Shelter">Shelter</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Quantity & Urgency */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Quantity Needed *
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                min="1"
                                value={form.quantity}
                                onChange={handleChange}
                                placeholder="e.g., 500"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Urgency Level
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {["low", "medium", "high"].map((level) => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({ ...prev, urgency: level }))
                                        }
                                        className={`px-3 py-2 rounded-xl border text-sm font-medium capitalize ${form.urgency === level
                                                ? "bg-primary-50 border-primary-500 text-primary-700"
                                                : "border-gray-300 text-gray-600 hover:border-primary-400"
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Explain who this will help, any constraints, ideal delivery dates, etc."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {submitted && !error && (
                        <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                            <Check size={16} />
                            This need has been saved (mock). Later this will call the
                            backend.
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                            <PackagePlus size={18} />
                            Publish Need
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
