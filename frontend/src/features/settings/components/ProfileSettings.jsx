"use client";

import { useState } from "react";
import { UserRound, Camera } from "lucide-react";
import { toast } from "sonner";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: "ExpenseFlow User",
    email: "user@example.com",
    phone: "",
  });

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!profile.name.trim() || !profile.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }

    toast.success("Profile updated in this session.");
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2B3243] dark:bg-[#191E2B]">
      <div className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your personal information.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <UserRound size={30} />
        </div>

        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            Profile Photo
          </p>

          <button
            type="button"
            onClick={() =>
              toast.info("Photo upload will be available later.")
            }
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <Camera size={16} />
            Change photo
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>

          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}