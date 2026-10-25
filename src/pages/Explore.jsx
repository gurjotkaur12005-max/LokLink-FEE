import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import LocalitySearch from "../components/LocalitySearch";
import LocalityCard from "../components/LocalityCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { searchLocalities } from "../services/storage";

function Explore() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("name");
  const inputRef = useRef(null); // useRef: lets us focus the search box

  // Focus the search box when the page opens
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // 1. filter by search text, 2. sort
  const found = searchLocalities(query);
  const results = [...found].sort((a, b) => {
    if (sortBy === "population") {
      return b.population - a.population;
    }
    return a.name.localeCompare(b.name);
  });

  function handleReset() {
    setQuery("");
    setSortBy("name");
    inputRef.current.focus();
  }

  return (
    <div className="container page">
      <header className="page-header">
        <h1>Explore your locality</h1>
        <p className="muted">Search by locality name, district, state or PIN code.</p>
      </header>

      <div className="search-panel">
        <LocalitySearch value={query} onChange={setQuery} inputRef={inputRef} />
      </div>

      <div className="toolbar">
        <p className="muted" aria-live="polite">{results.length} localities found</p>
        <div className="toolbar-controls">
          <label htmlFor="sort-localities" className="sr-only">Sort localities</label>
          <select id="sort-localities" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort: Name (A–Z)</option>
            <option value="population">Sort: Population (high to low)</option>
          </select>
          <Button variant="ghost" onClick={handleReset}>Reset search</Button>
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState title="No localities found" message="Try a different name, district, state or PIN code.">
          <Button onClick={handleReset}>Reset search</Button>
        </EmptyState>
      ) : (
        <div className="grid-cards">
          {results.map((locality) => (
            <LocalityCard key={locality.id} locality={locality} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Explore;
