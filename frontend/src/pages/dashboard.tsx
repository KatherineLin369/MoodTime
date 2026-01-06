import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setEmail(data.email);
      setLoading(false);
    }

    loadUser();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome, {email}</h1>

      <button
        className="mt-4 bg-red-600 text-white p-2 rounded"
        onClick={async () => {
          await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });
          navigate("/login");
        }}
      >
        Log Out
      </button>
    </div>
  );
}
