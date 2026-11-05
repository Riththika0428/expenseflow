import { Inter } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/context/ThemeProvider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "ExpenseFlow | Expense Management",
  description:
    "Manage your income, expenses and financial goals with ExpenseFlow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}