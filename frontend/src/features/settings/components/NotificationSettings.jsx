"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { toast } from "sonner";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    spendingUpdates: true,
    monthlyReports: false,
    securityAlerts: true,
  });

  const options = [
    {
      key: "budgetAlerts",
      title: "Budget Alerts",
      description: "Notify when spending approaches a budget limit.",
    },
    {
      key: "spendingUpdates",
      title: "Spending Updates",
      description: "Receive notifications about spending activity.",
    },
    {
      key: "monthlyReports",
      title: "Monthly Reports",
      description: "Receive a monthly financial summary.",
    },
    {
      key: "securityAlerts",
      title: "Security Alerts",
      description: "Receive alerts about important account activity.",
    },
  ];

  const handleToggle = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSave = () => {
    toast.success("Notification preferences updated for this session.");
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2B3243] dark:bg-[#191E2B]">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-50 p-2.5 dark:bg-indigo-500/10">
          <Bell size={20} className="text-indigo-600 dark:text-indigo-400" />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Notifications
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your notification preferences.
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-[#2B3243]">
        {options.map((option) => (
          <div
            key={option.key}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {option.title}
              </p>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {option.description}
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={notifications[option.key]}
              aria-label={option.title}
              onClick={() => handleToggle(option.key)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications[option.key]
                  ? "bg-indigo-600"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  notifications[option.key]
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Save Notification Settings
      </button>
    </section>
  );
}