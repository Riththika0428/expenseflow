"use client";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: "user@example.com",
        password: "your-password",
      });

      console.log("Login successful");
    } catch (error) {
      console.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <button onClick={handleLogin}>
      Test Login
    </button>
  );
}