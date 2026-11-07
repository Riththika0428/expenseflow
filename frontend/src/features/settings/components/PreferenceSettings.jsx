"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function PreferenceSettings() {
  const [preferences, setPreferences] = useState({
    currency: "LKR",
    language: "English",
    dateFormat: "DD/MM/YYYY",
  });

  const handleChange = (event) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    toast.success("Preferences updated for this session.");
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2B3243] dark:bg-[#191E2B]">
      <div className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Preferences
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize your application preferences.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Currency
          </label>

          <select
            name="currency"
            value={preferences.currency}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
          >
            <option value="LKR">LKR - Sri Lankan Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="EUR">EUR - Euro</option>
            <option value="INR">INR - Indian Rupee</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Language
          </label>

          <select
            name="language"
            value={preferences.language}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
          >
            <option>English</option>
            <option>Tamil</option>
            <option>Sinhala</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date Format
          </label>

          <select
            name="dateFormat"
            value={preferences.dateFormat}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Save Preferences
        </button>
      </div>
    </section>
  );
}