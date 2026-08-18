import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    };
    loadUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) return <div className="auth-container">Loading...</div>;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome!</h1>
        <p>You are logged in as:</p>
        <p className="user-email">{user?.email}</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}