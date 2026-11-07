"use client";

import { useState } from "react";
import { LockKeyhole, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (passwords.newPassword.length < 8) {
      toast.error("New password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    toast.info(
      "Password changes will be enabled after backend authentication is connected."
    );
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2B3243] dark:bg-[#191E2B]">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-emerald-50 p-2.5 dark:bg-emerald-500/10">
          <ShieldCheck
            size={20}
            className="text-emerald-600 dark:text-emerald-400"
          />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Security
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your account password.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          {
            name: "currentPassword",
            label: "Current Password",
          },
          {
            name: "newPassword",
            label: "New Password",
          },
          {
            name: "confirmPassword",
            label: "Confirm New Password",
          },
        ].map((field) => (
          <div key={field.name}>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>

            <div className="relative">
              <LockKeyhole
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name={field.name}
                value={passwords[field.name]}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-12 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide passwords" : "Show passwords"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Update Password
        </button>
      </form>
    </section>
  );
}