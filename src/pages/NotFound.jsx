import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

function NotFound() {
  return (
    <div className="container page">
      <EmptyState icon="🧭" title="404 · Page not found" message="The page you are looking for does not exist or has moved.">
        <Button to="/">Go to Home</Button>
        <Button to="/explore" variant="outline">Explore localities</Button>
      </EmptyState>
    </div>
  );
}

export default NotFound;
