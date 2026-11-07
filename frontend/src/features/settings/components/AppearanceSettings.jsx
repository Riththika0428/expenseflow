"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  setMounted(true);
  }, []);

  const options = [
    {
      value: "light",
      label: "Light",
      description: "Use the light appearance.",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Use the dark appearance.",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      description: "Follow your device preference.",
      icon: Monitor,
    },
  ];

  const handleThemeChange = (value) => {
    setTheme(value);
    toast.success(`${value} theme selected.`);
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2B3243] dark:bg-[#191E2B]">
      <div className="mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Appearance
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Choose how ExpenseFlow looks on your device.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon;
          const active = mounted && theme === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleThemeChange(option.value)}
              aria-pressed={active}
              className={`rounded-xl border p-4 text-left transition ${
                active
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                  : "border-gray-200 hover:border-gray-300 dark:border-[#2B3243] dark:hover:border-gray-500"
              }`}
            >
              <Icon
                size={22}
                className={
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-500 dark:text-gray-400"
                }
              />

              <p className="mt-3 font-medium text-gray-900 dark:text-white">
                {option.label}
              </p>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {option.description}
              </p>

              {active && (
                <p className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  Selected
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}