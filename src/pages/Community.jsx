import { useState, useEffect } from "react";
import CommunityCard from "../components/CommunityCard";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import Button from "../components/Button";
import community from "../data/community.json";
import { readJSON, writeJSON, KEYS } from "../services/storage";
import { fetchCommunityPosts } from "../services/api";

const filters = ["All", "Announcement", "Tip", "Event", "Bookmarked"];

function Community() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [bookmarks, setBookmarks] = useState(readJSON(KEYS.bookmarks, []));

  // State for the optional API request
  const [apiPosts, setApiPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // async/await function that calls the API
  async function loadPosts() {
    setLoading(true);
    setError("");
    try {
      const posts = await fetchCommunityPosts();
      setApiPosts(posts);
    } catch (err) {
      setError("Could not load the online feed. Showing local tips instead.");
    }
    setLoading(false);
  }

  // Run once when the page opens
  useEffect(() => {
    loadPosts();
  }, []);

  function toggleBookmark(id) {
    let updated;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter((b) => b !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarks(updated);
    writeJSON(KEYS.bookmarks, updated);
  }

  const text = search.trim().toLowerCase();
  const results = community.filter((post) => {
    const matchesText = post.title.toLowerCase().includes(text) || post.body.toLowerCase().includes(text);
    let matchesFilter = true;
    if (filter === "Bookmarked") {
      matchesFilter = bookmarks.includes(post.id);
    } else if (filter !== "All") {
      matchesFilter = post.category === filter;
    }
    return matchesText && matchesFilter;
  });

  function handleReset() {
    setSearch("");
    setFilter("All");
  }

  // Fallback: if the request failed, show a few local tips
  const fallbackTips = community.filter((p) => p.category === "Tip").slice(0, 3);

  return (
    <div className="container page">
      <header className="page-header">
        <h1>Community</h1>
        <p className="muted">Announcements, public-service tips and local events. All posts here are samples.</p>
      </header>

      <div className="search-panel">
        <label htmlFor="community-search" className="sr-only">Search community posts</label>
        <input id="community-search" type="search" className="plain-search" placeholder="Search posts"
          value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="filter-row" role="group" aria-label="Filter posts">
        {filters.map((name) => (
          <button key={name} type="button" aria-pressed={filter === name}
            className={filter === name ? "filter-chip is-active" : "filter-chip"}
            onClick={() => setFilter(name)}>
            {name === "Bookmarked" ? "★ Bookmarked (" + bookmarks.length + ")" : name}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <EmptyState title="No posts found" message="Try another search or show all posts.">
          <Button onClick={handleReset}>Reset</Button>
        </EmptyState>
      ) : (
        <div className="grid-cards">
          {results.map((post) => (
            <CommunityCard key={post.id} post={post} bookmarked={bookmarks.includes(post.id)} onToggle={toggleBookmark} />
          ))}
        </div>
      )}

      <section className="detail-block api-section">
        <h2>Online sample feed</h2>
        <p className="muted small">
          Loaded with fetch() from JSONPlaceholder, a free practice API. Its text is placeholder
          text, not real civic news.
        </p>
        {loading && <Loader text="Loading online feed..." />}
        {!loading && error !== "" && (
          <div className="notice">
            <p>{error}</p>
            <Button variant="outline" onClick={loadPosts}>Retry</Button>
            <ul className="plain-list">
              {fallbackTips.map((tip) => <li key={tip.id}><strong>{tip.title}</strong></li>)}
            </ul>
          </div>
        )}
        {!loading && error === "" && (
          <ul className="plain-list">
            {apiPosts.map((post) => (
              <li key={post.id}><strong>{post.title}</strong><p className="muted small">{post.body}</p></li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Community;
