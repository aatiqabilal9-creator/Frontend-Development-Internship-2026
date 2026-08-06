import { useState, type FormEvent } from "react";
import "./App.css";

interface PokemonData {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

function App() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const name = query.trim().toLowerCase();
    if (!name) {
      setError("Enter a Pokémon name.");
      return;
    }

    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

      if (res.status === 404) {
        setError(`No Pokémon found for "${name}".`);
        return;
      }

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      const data = await res.json();
      setPokemon({
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
        types: data.types.map((t: { type: { name: string } }) => t.type.name),
        height: data.height,
        weight: data.weight,
      });
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Pokémon Viewer</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a Pokémon name (e.g. pikachu)"
          aria-label="Pokémon name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {pokemon && (
        <div className="pokemon-card">
          <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <div className="type-badges">
            {pokemon.types.map((type) => (
              <span key={type} className={`type-badge type-${type}`}>
                {type}
              </span>
            ))}
          </div>
          <div className="pokemon-stats">
            <div className="stat">
              <span className="stat-label">Height</span>
              <span className="stat-value">{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className="stat">
              <span className="stat-label">Weight</span>
              <span className="stat-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;