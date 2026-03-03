import React, { useState } from 'react';

export default function Settings() {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        darkMode: false,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleToggle = (key) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setSuccessMessage('Settings saved successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleReset = () => {
        setSettings({
            emailNotifications: true,
            smsNotifications: false,
            darkMode: false,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

   return (
    <div className="min-h-screen bg-gray-100 px-10 py-8">
        <div className="max-w-5xl mx-auto">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Settings
            </h2>

            {successMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}

            {/* Notifications Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
                <h2 className="text-xl font-semibold mb-6 border-b pb-3">
                    Notification Preferences
                </h2>

                <div className="space-y-6">

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">
                                Receive system alerts via email
                            </p>
                        </div>

                        <button
                            onClick={() => handleToggle("emailNotifications")}
                            className={`w-14 h-7 rounded-full transition duration-300 ${
                                settings.emailNotifications
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                                    settings.emailNotifications
                                        ? "translate-x-7"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-500">
                                Receive important alerts via SMS
                            </p>
                        </div>

                        <button
                            onClick={() => handleToggle("smsNotifications")}
                            className={`w-14 h-7 rounded-full transition duration-300 ${
                                settings.smsNotifications
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                                    settings.smsNotifications
                                        ? "translate-x-7"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>

                </div>
            </div>

            {/* Appearance Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
                <h2 className="text-xl font-semibold mb-6 border-b pb-3">
                    Appearance
                </h2>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-gray-500">
                            Enable dark theme across dashboard
                        </p>
                    </div>

                    <button
                        onClick={() => handleToggle("darkMode")}
                        className={`w-14 h-7 rounded-full transition duration-300 ${
                            settings.darkMode
                                ? "bg-green-500"
                                : "bg-gray-300"
                        }`}
                    >
                        <div
                            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
                                settings.darkMode
                                    ? "translate-x-7"
                                    : "translate-x-1"
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
                <h2 className="text-xl font-semibold mb-6 border-b pb-3">
                    Account Security
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={settings.currentPassword}
                        onChange={handleInputChange}
                        className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={settings.newPassword}
                        onChange={handleInputChange}
                        className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={settings.confirmPassword}
                        onChange={handleInputChange}
                        className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />

                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">

                <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                    Reset
                </button>

                <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                    Save Changes
                </button>

            </div>

        </div>
    </div>
);
}