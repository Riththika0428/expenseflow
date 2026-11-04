import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F8FC]">
      <div className="text-center space-y-5 p-6">

        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#5145CD] flex items-center justify-center text-white text-3xl font-bold">
          E
        </div>

        <h1 className="text-4xl font-bold text-[#1E2433]">
          ExpenseFlow
        </h1>

        <p className="text-gray-500 max-w-md">
          Take control of your money. Manage income,
          expenses and financial goals in one place.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="bg-[#5145CD] text-white px-6 py-3 rounded-lg hover:bg-[#4035B5] transition"
          >
            Open Dashboard
          </Link>

          <button className="border border-gray-300 px-6 py-3 rounded-lg">
            Get Started
          </button>
        </div>

      </div>
    </main>
  );
}