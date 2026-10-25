import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ComplaintCard from "../components/ComplaintCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { getAllComplaints, STATUS_STEPS, COMPLAINT_CATEGORIES } from "../services/storage";

function Complaints() {
  const [searchParams] = useSearchParams();
  const startCategory = searchParams.get("category") || "All"; // from Home category tiles

  const [allComplaints] = useState(getAllComplaints());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(startCategory);
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const text = search.trim().toLowerCase();
  const filtered = allComplaints.filter((c) => {
    const matchesText = c.title.toLowerCase().includes(text) || c.id.toLowerCase().includes(text);
    const matchesCategory = category === "All" || c.category === category;
    const matchesStatus = status === "All" || c.status === status;
    return matchesText && matchesCategory && matchesStatus;
  });

  const results = [...filtered].sort((a, b) => {
    if (sortBy === "oldest") {
      return a.date.localeCompare(b.date);
    }
    return b.date.localeCompare(a.date);
  });

  function handleReset() {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setSortBy("newest");
  }

  return (
    <div className="container page">
      <header className="detail-header">
        <div>
          <h1>Civic complaints</h1>
          <p className="muted">Browse sample complaints or report a new issue.</p>
        </div>
        <Button to="/complaints/new" variant="lime">Report an issue</Button>
      </header>

      <div className="filter-bar">
        <div>
          <label htmlFor="complaint-search">Search</label>
          <input id="complaint-search" type="search" placeholder="Title or reference ID"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          <label htmlFor="complaint-category">Category</label>
          <select id="complaint-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All categories</option>
            {COMPLAINT_CATEGORIES.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="complaint-status">Status</label>
          <select id="complaint-status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All statuses</option>
            {STATUS_STEPS.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="complaint-sort">Sort</label>
          <select id="complaint-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      <div className="toolbar">
        <p className="muted" aria-live="polite">{results.length} complaints found</p>
        <Button variant="ghost" onClick={handleReset}>Reset filters</Button>
      </div>

      {results.length === 0 ? (
        <EmptyState title="No complaints match" message="Try a different search or clear the filters.">
          <Button onClick={handleReset}>Reset filters</Button>
        </EmptyState>
      ) : (
        <div className="grid-cards">
          {results.map((complaint) => <ComplaintCard key={complaint.id} complaint={complaint} />)}
        </div>
      )}
    </div>
  );
}

export default Complaints;
