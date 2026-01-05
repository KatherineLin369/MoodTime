"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      setEmail(data.email);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome, {email}</h1>
      <p>You are logged in!</p>
      <button
  onClick={async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  }}
>
  Log Out
</button>
    </div>
  );
}
