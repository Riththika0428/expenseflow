"use client";

import ProfileSettings from "@/features/settings/components/ProfileSettings";
import PreferenceSettings from "@/features/settings/components/PreferenceSettings";
import AppearanceSettings from "@/features/settings/components/AppearanceSettings";
import NotificationSettings from "@/features/settings/components/NotificationSettings";
import SecuritySettings from "@/features/settings/components/SecuritySettings";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-7">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your profile, preferences and account security.
          </p>
        </div>

        {/* Profile */}
        <ProfileSettings />

        {/* Preferences */}
        <PreferenceSettings />

        {/* Appearance */}
        <AppearanceSettings />

        {/* Notifications */}
        <NotificationSettings />

        {/* Security */}
        <SecuritySettings />
      </div>
    </DashboardLayout>
  );
}