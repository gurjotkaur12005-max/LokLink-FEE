import { formatDate } from "../services/storage";

// Shows one community post. The bookmark button appears only if onToggle is given.
function CommunityCard({ post, bookmarked, onToggle }) {
  const tone = post.category === "Event" ? "orange" : post.category === "Tip" ? "green" : "blue";
  return (
    <article className="card community-card">
      <div className="card-top">
        <span className={"tag tag-" + tone}>{post.icon} {post.category}</span>
        <span className="muted small">{formatDate(post.date)}</span>
      </div>
      <h3>{post.title}</h3>
      <p className="muted">{post.body}</p>
      <div className="card-top">
        <span className="small muted">📍 {post.locality}</span>
        {onToggle && (
          <button
            type="button"
            className={bookmarked ? "bookmark is-on" : "bookmark"}
            onClick={() => onToggle(post.id)}
            aria-pressed={bookmarked}
          >
            {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
          </button>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
