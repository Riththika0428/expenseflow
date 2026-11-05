"use client";

import { useState } from "react";

import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  UserRound,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

export default function Navbar({ setMobileOpen }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 sm:px-6 lg:px-8">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--background)] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div className="relative hidden sm:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />

          <input
            type="search"
            placeholder="Search anything..."
            className="h-10 w-56 rounded-xl border border-[var(--border)] bg-[var(--background)] pl-10 pr-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] lg:w-72"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">

        <ThemeToggle />

        <button
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--background)]"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--expense)] ring-2 ring-[var(--surface)]" />
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-[var(--background)]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-light)] text-sm font-semibold text-[var(--primary)]">
              R
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Riththika
              </p>

              <p className="text-xs text-[var(--text-secondary)]">
                Personal Account
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-[var(--text-secondary)] md:block"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg">
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)]">
                <UserRound size={16} />
                My Profile
              </div>

              <button
                onClick={() => setProfileOpen(false)}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--text-secondary)] hover:bg-[var(--background)]"
              >
                Close menu
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}