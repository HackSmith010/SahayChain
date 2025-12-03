// src/pages/SettingsPage.jsx
import { useState } from "react";
import {
    Bell,
    Mail,
    Smartphone,
    ShieldCheck,
    Globe,
    Save,
    CheckCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SettingsPage() {
    const { user } = useAuth();

    // purely frontend state for now
    const [timezone, setTimezone] = useState("Asia/Kolkata");
    const [emailAlerts, setEmailAlerts] = useState({
        verificationUpdates: true,
        deliveryUpdates: true,
        feedbackSummaries: false,
        systemAnnouncements: true,
    });
    const [inAppAlerts, setInAppAlerts] = useState({
        newFlags: user?.role === "admin",
        newNeeds: user?.role === "donor",
        deliveryStatusChanges: true,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [savedAt, setSavedAt] = useState(null);

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);

        // mock "save" – later this can call an API
        setTimeout(() => {
            setIsSaving(false);
            setSavedAt(new Date());
        }, 800);
    };

    const formatTime = (date) =>
        date?.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                        Preferences & Alerts
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Control how SahayChain keeps you informed about activity on the
                        platform.
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                    <ShieldCheck className="text-emerald-500" size={20} />
                    <div className="text-sm">
                        <div className="font-semibold text-slate-900">
                            {user?.name || "SahayChain user"}
                        </div>
                        <div className="text-slate-500 capitalize">
                            {user?.role || "role"} · Alerts secured & private
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <form
                onSubmit={handleSave}
                className="grid grid-cols-1 xl:grid-cols-3 gap-6"
            >
                {/* Notification Channels */}
                <section className="xl:col-span-2 space-y-6">
                    {/* Email Alerts */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Email alerts
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Sent to {user?.email || "your registered email address"}.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <ToggleRow
                                label="Verification & KYC updates"
                                description="When your account or documents are approved, rejected, or require changes."
                                checked={emailAlerts.verificationUpdates}
                                onChange={(val) =>
                                    setEmailAlerts((prev) => ({
                                        ...prev,
                                        verificationUpdates: val,
                                    }))
                                }
                            />
                            <ToggleRow
                                label="Delivery status updates"
                                description="When a donation linked to you moves from dispatched to delivered."
                                checked={emailAlerts.deliveryUpdates}
                                onChange={(val) =>
                                    setEmailAlerts((prev) => ({
                                        ...prev,
                                        deliveryUpdates: val,
                                    }))
                                }
                            />
                            <ToggleRow
                                label="Feedback summaries"
                                description="Periodic summary of ratings and comments about your deliveries or needs."
                                checked={emailAlerts.feedbackSummaries}
                                onChange={(val) =>
                                    setEmailAlerts((prev) => ({
                                        ...prev,
                                        feedbackSummaries: val,
                                    }))
                                }
                            />
                            <ToggleRow
                                label="System announcements"
                                description="Major product updates, new features, and policy changes."
                                checked={emailAlerts.systemAnnouncements}
                                onChange={(val) =>
                                    setEmailAlerts((prev) => ({
                                        ...prev,
                                        systemAnnouncements: val,
                                    }))
                                }
                            />
                        </div>
                    </div>

                    {/* In-app Alerts */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    In-dashboard alerts
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Controls the little green dot on the notification bell and
                                    quick action widgets.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {user?.role === "admin" && (
                                <ToggleRow
                                    label="New flagged needs"
                                    description="When the anomaly engine flags an NGO request for review."
                                    checked={inAppAlerts.newFlags}
                                    onChange={(val) =>
                                        setInAppAlerts((prev) => ({ ...prev, newFlags: val }))
                                    }
                                />
                            )}

                            {user?.role === "donor" && (
                                <ToggleRow
                                    label="New verified needs near me"
                                    description="When a high-urgency request is created in your geography."
                                    checked={inAppAlerts.newNeeds}
                                    onChange={(val) =>
                                        setInAppAlerts((prev) => ({ ...prev, newNeeds: val }))
                                    }
                                />
                            )}

                            <ToggleRow
                                label="Delivery status changes"
                                description="When a delivery linked to you moves between accepted / in-transit / delivered."
                                checked={inAppAlerts.deliveryStatusChanges}
                                onChange={(val) =>
                                    setInAppAlerts((prev) => ({
                                        ...prev,
                                        deliveryStatusChanges: val,
                                    }))
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* Right column – meta settings */}
                <aside className="space-y-6">
                    {/* Timezone */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                                <Globe size={20} />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Timezone & locale
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Used to schedule alerts & show dates.
                                </p>
                            </div>
                        </div>

                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                            Preferred timezone
                        </label>
                        <select
                            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                        >
                            <option value="Asia/Kolkata">Asia / Kolkata (IST)</option>
                            <option value="Asia/Dubai">Asia / Dubai</option>
                            <option value="Europe/London">Europe / London</option>
                            <option value="UTC">UTC</option>
                        </select>

                        <p className="mt-3 text-xs text-slate-500">
                            All timestamps in your dashboards will be shown using this
                            timezone.
                        </p>
                    </div>

                    {/* Device hints / mock */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                                <Smartphone size={20} />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Coming soon
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Mobile push and WhatsApp alerts are on our roadmap.
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600">
                            For now, email + in-dashboard alerts will keep you fully in the
                            loop.
                        </p>
                    </div>

                    {/* Save Card */}
                    <div className="bg-slate-900 text-slate-50 rounded-2xl shadow-lg border border-slate-800 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                                <Save size={20} />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold">
                                    Save notification settings
                                </h2>
                                <p className="text-xs text-slate-400">
                                    This is mocked locally for now – we’ll connect it to the API
                                    later.
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Saving…
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Save preferences
                                </>
                            )}
                        </button>

                        {savedAt && (
                            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-200">
                                <CheckCircle size={14} />
                                <span>
                                    Preferences saved at <strong>{formatTime(savedAt)}</strong>
                                </span>
                            </div>
                        )}
                    </div>
                </aside>
            </form>
        </div>
    );
}

// Reusable row component for toggles
const ToggleRow = ({ label, description, checked, onChange }) => (
    <div className="flex items-start justify-between gap-4">
        <div>
            <div className="font-medium text-slate-900 text-sm">{label}</div>
            {description && (
                <p className="text-xs text-slate-500 mt-1 max-w-xl">{description}</p>
            )}
        </div>
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full border transition-all duration-200 ${checked
                ? "bg-emerald-500 border-emerald-500"
                : "bg-slate-200 border-slate-300"
                }`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-1"
                    }`}
            />
        </button>
    </div>
);
