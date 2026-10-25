import { useState } from "react";
import SchemeCard from "../components/SchemeCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import schemes from "../data/schemes.json";

// Build the category list from the data: "All" + each unique category
const categories = ["All", ...new Set(schemes.map((s) => s.category))];

function Schemes() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const text = search.trim().toLowerCase();
  const results = schemes.filter((scheme) => {
    const matchesTitle = scheme.title.toLowerCase().includes(text);
    const matchesCategory = category === "All" || scheme.category === category;
    return matchesTitle && matchesCategory;
  });

  function handleReset() {
    setSearch("");
    setCategory("All");
  }

  return (
    <div className="container page">
      <header className="page-header">
        <h1>Government schemes</h1>
        <p className="muted">Plain-language summaries of schemes. Save the ones you want to look at again.</p>
      </header>

      <div className="search-panel">
        <label htmlFor="scheme-search" className="sr-only">Search schemes by title</label>
        <input
          id="scheme-search"
          type="search"
          className="plain-search"
          placeholder="Search schemes by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-row" role="group" aria-label="Filter by category">
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            className={category === name ? "filter-chip is-active" : "filter-chip"}
            onClick={() => setCategory(name)}
            aria-pressed={category === name}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="toolbar">
        <p className="muted" aria-live="polite">{results.length} schemes found</p>
        <Button variant="ghost" onClick={handleReset}>Reset filters</Button>
      </div>

      {results.length === 0 ? (
        <EmptyState title="No schemes match" message="Try another title or choose a different category.">
          <Button onClick={handleReset}>Reset filters</Button>
        </EmptyState>
      ) : (
        <div className="grid-cards">
          {results.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Schemes;
