import { useState } from "react";
import { searchLocalities } from "../services/storage";

// Search box with suggestions. The parent owns the text (value / onChange).
function LocalitySearch({ value, onChange, onSubmit, inputRef }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Show at most 5 suggestions while the user types
  let suggestions = [];
  if (value.trim() !== "") {
    suggestions = searchLocalities(value).slice(0, 5);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowSuggestions(false);
    if (onSubmit) {
      onSubmit();
    }
  }

  function handleType(event) {
    onChange(event.target.value);
    setShowSuggestions(true);
  }

  function pickSuggestion(locality) {
    onChange(locality.name);
    setShowSuggestions(false);
  }

  return (
    <form className="locality-search" onSubmit={handleSubmit} role="search">
      <div className="search-box">
        <span aria-hidden="true">🔍</span>
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={handleType}
          onBlur={() => setShowSuggestions(false)}
          placeholder="Search by locality, district, state or PIN"
          aria-label="Search localities"
          autoComplete="off"
        />
        <button type="submit" className="btn btn-lime">Search</button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((locality) => (
            <li key={locality.id}>
              {/* onMouseDown runs before the input's onBlur, so the click is not lost */}
              <button type="button" onMouseDown={() => pickSuggestion(locality)}>
                <strong>{locality.name}</strong>
                <span>{locality.district}, {locality.state} · {locality.pin}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default LocalitySearch;
