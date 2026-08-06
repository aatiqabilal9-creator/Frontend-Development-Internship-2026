import { useState,type FormEvent } from "react";
import "./App.css";

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Enter a username to search.");
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const res = await fetch(`https://api.github.com/users/${trimmed}`);

      if (res.status === 404) {
        setError(`No GitHub user found for "${trimmed}".`);
        return;
      }

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      const data: GitHubUser = await res.json();
      setUser(data);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>GitHub User Search</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a GitHub username"
          aria-label="GitHub username"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {user && (
        <div className="profile-card">
          <img src={user.avatar_url} alt={`${user.login} avatar`} className="avatar" />
          <div className="profile-info">
            <h2>{user.name || user.login}</h2>
            <p className="username">@{user.login}</p>
            {user.bio && <p className="bio">{user.bio}</p>}
            <div className="stats">
              <span>
                <strong>{user.followers.toLocaleString()}</strong> followers
              </span>
              <span>
                <strong>{user.following.toLocaleString()}</strong> following
              </span>
              <span>
                <strong>{user.public_repos.toLocaleString()}</strong> repos
              </span>
            </div>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              View profile on GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;